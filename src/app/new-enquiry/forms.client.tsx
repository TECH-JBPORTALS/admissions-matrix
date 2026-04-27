"use client";

import {
  FormItem,
  Form,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { toaster } from "@/components/ui/toaster";
import { useAppDispatch } from "@/hooks";
import { useEnquiryStore } from "@/providers/enquiry-store-provider";
import { useAppSelector } from "@/store";
import {
  fetchBranchList,
  fetchCollegeList,
  fetchFeeQouted,
} from "@/store/admissions.slice";
import {
  boardOptions,
  categoryOptions,
  courseOptions,
  examsOptions,
  genderOptions,
  sourceOptions,
} from "@/utils/constants";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  CheckboxCard,
  Float,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  NumberInput,
  RadioCard,
  SimpleGrid,
  Skeleton,
  Spinner,
  Steps,
  Text,
  useStepsContext,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LuBookA, LuBox, LuBuilding, LuBusFront } from "react-icons/lu";
import { z } from "zod";

const phoneRegex = /^[6-9]\d{9}$/;

const studentVerificationSchema = z.object({
  regno: z.string().min(1, "Register number is required"),

  studentPhone: z
    .string()
    .optional()
    .refine((val) => !val || phoneRegex.test(val), {
      message: "Invalid mobile number",
    }),

  fatherPhone: z
    .string()
    .optional()
    .refine((val) => !val || phoneRegex.test(val), {
      message: "Invalid mobile number",
    }),

  motherPhone: z
    .string()
    .optional()
    .refine((val) => !val || phoneRegex.test(val), {
      message: "Invalid mobile number",
    }),
});

export function StudentVerificationForm() {
  const defaultValues = useEnquiryStore((state) => state.studentVerification);
  const form = useForm<z.infer<typeof studentVerificationSchema>>({
    resolver: zodResolver(studentVerificationSchema),
    defaultValues,
  });

  const steps = useStepsContext();
  const updateStore = useEnquiryStore((s) => s.update);
  const acadYear = useAppSelector((s) => s.admissions.acadYear);

  async function onSubmit(values: z.infer<typeof studentVerificationSchema>) {
    try {
      const fd = new FormData();
      fd.append("acadyear", acadYear);
      fd.append("reg_no", values.regno);
      fd.append("student_no", values.studentPhone ?? "");
      fd.append("mother_no", values.motherPhone ?? "");
      fd.append("father_no", values.fatherPhone ?? "");

      //Verify if student enquiry already exists or not
      await axios(process.env.NEXT_PUBLIC_ADMISSIONS_URL + "verify.php", {
        data: fd,
        method: "POST",
      });

      updateStore("studentVerification", values);
      steps.goToNextStep();
    } catch (e: any) {
      toaster.error({
        title: e.response?.data.msg ?? "Network Error",
      });
    }
  }

  return (
    <React.Fragment>
      <Form {...form}>
        <Box asChild spaceY={"6"}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="regno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Register Number</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Student Phone Number (Optional)"}</FormLabel>
                  <InputGroup startAddon={"+ 91"}>
                    <Input {...field} />
                  </InputGroup>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fatherPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Father Phone Number (Optional)"}</FormLabel>
                  <InputGroup startAddon={"+ 91"}>
                    <Input {...field} />
                  </InputGroup>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="motherPhone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{"Mother Phone Number (Optional)"}</FormLabel>
                  <InputGroup startAddon={"+ 91"}>
                    <Input {...field} />
                  </InputGroup>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <ButtonGroup>
              <Button type="submit">Verify</Button>
            </ButtonGroup>
          </form>
        </Box>
      </Form>
    </React.Fragment>
  );
}

const studentDetailsSchema = z.object({
  studentName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  gender: z
    .enum(["MALE", "FEMALE", "OTHER"], { message: "Gender is required" })
    .array(),

  aadharNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{12}$/.test(val), {
      message: "Aadhar must be exactly 12 digits",
    }),

  panNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val), {
      message: "Invalid PAN number format",
    }),

  email: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z.string().email("Invalid email address").optional(),
  ),

  studentPhone: z.string().regex(phoneRegex),

  address: z.string().min(5, "Address is too short"),

  city: z.string().min(2, "City is required"),

  state: z.string().min(2, "State is required"),
});

export function StudentDetailsForm() {
  const defaultValues = useEnquiryStore((state) => state.studentDetails);
  const studentPhone = useEnquiryStore(
    (state) => state.studentVerification.studentPhone,
  );
  const form = useForm<z.infer<typeof studentDetailsSchema>>({
    resolver: zodResolver(studentDetailsSchema),
    defaultValues,
  });

  const steps = useStepsContext();
  const updateStore = useEnquiryStore((s) => s.update);

  useEffect(() => {
    if (studentPhone)
      form.reset({
        studentPhone,
      });
  }, [studentPhone, form.reset, form]);

  async function onSubmit(values: z.infer<typeof studentDetailsSchema>) {
    updateStore("studentDetails", values);
    steps.goToNextStep();
  }

  return (
    <React.Fragment>
      <Form {...form}>
        <Box asChild spaceY="6">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="studentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Name</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <SelectRoot
                    name={field.name}
                    value={field.value}
                    collection={genderOptions}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select gender" />
                    </SelectTrigger>

                    <SelectContent>
                      {genderOptions.items.map((item) => (
                        <SelectItem key={item.value} item={item}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studentPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Student Phone Number"}</FormLabel>
                  <InputGroup startAddon={"+ 91"}>
                    <Input {...field} />
                  </InputGroup>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aadharNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aadhar Number</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="panNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PAN Number</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <ButtonGroup>
              <Steps.PrevTrigger asChild>
                <Button variant={"subtle"}>Prev</Button>
              </Steps.PrevTrigger>
              <Button type="submit">Next</Button>
            </ButtonGroup>
          </form>
        </Box>
      </Form>
    </React.Fragment>
  );
}

const academicBackgroundSchema = z
  .object({
    course: z.string(),
    previousSchoolOrCollege: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Too long"),

    board: z.string().array().min(1, "Required"),

    overallPercentage: z
      .string()
      .min(1, "Required")
      .refine((val) => !isNaN(parseInt(val)), {
        message: "Must be a valid number",
      })
      .refine((val) => parseInt(val) >= 0 && parseInt(val) <= 100, {
        message: "Percentage must be between 0 and 100",
      }),

    /** Only if the course selected to ENGINEERING */
    pcmAggregate: z
      .string()
      .refine((val) => !isNaN(parseInt(val)), {
        message: "Must be a valid number",
      })
      .refine((val) => parseInt(val) >= 0 && parseInt(val) <= 100, {
        message: "PCM Aggregate must be between 0 and 100",
      }),
    exam: z.string().array(),
    rank: z.string(),
  })
  .superRefine((data, ctx) => {
    console.log(data.course);
    if (data.course === "ENGINEERING") {
      if (!data.pcmAggregate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "PCM Aggregate is required for ENGINEERING",
          path: ["pcmAggregate"],
        });
      }

      if (!data.exam || data.exam.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Exam is required for ENGINEERING",
          path: ["exam"],
        });
      }

      if (!data.rank) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Rank is required for ENGINEERING",
          path: ["rank"],
        });
      }
    }
  });

export function AcademicBackgroundForm() {
  const defaultValues = useEnquiryStore((state) => state.academicBackground);
  const course = useEnquiryStore((state) => state.courseSelection.course);

  const form = useForm<z.infer<typeof academicBackgroundSchema>>({
    resolver: zodResolver(academicBackgroundSchema),
  });

  const steps = useStepsContext();
  const updateStore = useEnquiryStore((s) => s.update);

  useEffect(() => {
    form.reset(
      {
        ...defaultValues,
        course,
      },
      { keepDirty: true },
    );
  }, [course, form.reset]);

  async function onSubmit(values: z.infer<typeof academicBackgroundSchema>) {
    updateStore("academicBackground", values);
    steps.goToNextStep();
  }

  return (
    <React.Fragment>
      {/* <pre>{JSON.stringify(form.getValues(), undefined, 2)}</pre> */}
      <Form {...form}>
        <Box asChild spaceY="6">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="previousSchoolOrCollege"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous School/College</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="board"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board</FormLabel>
                  <SelectRoot
                    name={field.name}
                    value={field.value}
                    collection={boardOptions}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select Board" />
                    </SelectTrigger>

                    <SelectContent>
                      {boardOptions.items.map((item) => (
                        <SelectItem key={item.value} item={item}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="overallPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overall Percentage / CGPA</FormLabel>
                  <NumberInput.Root
                    w={"full"}
                    min={0}
                    max={100}
                    disabled={field.disabled}
                    name={field.name}
                    value={field.value}
                    onValueChange={({ value }) => {
                      field.onChange(value);
                    }}
                  >
                    <NumberInput.Control />
                    <NumberInput.Input />
                  </NumberInput.Root>
                  <FormMessage />
                </FormItem>
              )}
            />

            {course === "ENGINEERING" && (
              <React.Fragment>
                <FormField
                  control={form.control}
                  name="exam"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exam</FormLabel>
                      <SelectRoot
                        name={field.name}
                        value={field.value}
                        collection={examsOptions}
                        onValueChange={({ value }) => field.onChange(value)}
                        onInteractOutside={() => field.onBlur()}
                      >
                        <SelectTrigger>
                          <SelectValueText placeholder="Select Exam" />
                        </SelectTrigger>

                        <SelectContent>
                          {examsOptions.items.map((item) => (
                            <SelectItem key={item.value} item={item}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectRoot>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pcmAggregate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PCM Aggregate</FormLabel>
                      <NumberInput.Root
                        w={"full"}
                        min={0}
                        max={100}
                        disabled={field.disabled}
                        name={field.name}
                        value={field.value}
                        onValueChange={({ value }) => {
                          field.onChange(value);
                        }}
                      >
                        <NumberInput.Control />
                        <NumberInput.Input />
                      </NumberInput.Root>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rank</FormLabel>
                      <NumberInput.Root
                        w={"full"}
                        disabled={field.disabled}
                        name={field.name}
                        value={field.value}
                        onValueChange={({ value }) => {
                          field.onChange(value);
                        }}
                      >
                        <NumberInput.Control />
                        <NumberInput.Input />
                      </NumberInput.Root>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </React.Fragment>
            )}

            <ButtonGroup>
              <Steps.PrevTrigger asChild>
                <Button variant={"subtle"}>Prev</Button>
              </Steps.PrevTrigger>
              <Button type="submit">Next</Button>
            </ButtonGroup>
          </form>
        </Box>
      </Form>
    </React.Fragment>
  );
}

const courseSelectionSchema = z.object({
  course: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Too long"),

  college: z.string().min(1, "Required"),
  branch: z.string().min(1, "Required"),
});

export function CourseSelectionForm() {
  const defaultValues = useEnquiryStore((state) => state.referal);
  const form = useForm<z.infer<typeof courseSelectionSchema>>({
    resolver: zodResolver(courseSelectionSchema),
    defaultValues: {
      ...defaultValues,
      course: courseOptions.firstValue ?? "",
    },
  });

  const dispatch = useAppDispatch();
  const collegeList = useAppSelector(
    (state) => state.admissions.collegeList.data,
  ) as { value: string; option: string }[];
  const collegeListPending = useAppSelector(
    (state) => state.admissions.collegeList.pending,
  );

  const branchList = useAppSelector(
    (state) => state.admissions.branchlist.data,
  ) as { value: string; option: string }[];
  const branchListPending = useAppSelector(
    (state) => state.admissions.collegeList.pending,
  );

  const steps = useStepsContext();
  const course = form.watch().course;
  const college = form.watch().college;

  useEffect(() => {
    dispatch(fetchCollegeList({ course }));
    form.setValue("college", "");
    form.setValue("branch", "");
  }, [course, dispatch]);

  useEffect(() => {
    dispatch(fetchBranchList({ college }));
  }, [college, dispatch]);

  const updateStore = useEnquiryStore((s) => s.update);

  async function onSubmit(values: z.infer<typeof courseSelectionSchema>) {
    updateStore("courseSelection", values);
    steps.goToNextStep();
  }

  return (
    <React.Fragment>
      <Form {...form}>
        <Box asChild spaceY="6">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <RadioCard.Root
                    name={field.name}
                    value={field.value}
                    align="center"
                    variant={"surface"}
                    onValueChange={(e) => field.onChange(e.value)}
                  >
                    <RadioCard.Label asChild>
                      <FormLabel>Course</FormLabel>
                    </RadioCard.Label>
                    <HStack align="stretch">
                      {courseOptions.items.map((item) => (
                        <RadioCard.Item key={item.value} value={item.value}>
                          <RadioCard.ItemHiddenInput onBlur={field.onBlur} />
                          <RadioCard.ItemControl>
                            <Icon fontSize="lg" color="fg.muted">
                              <LuBookA />
                            </Icon>
                            <RadioCard.ItemText>
                              {item.label}
                            </RadioCard.ItemText>
                            <RadioCard.ItemIndicator />
                          </RadioCard.ItemControl>
                        </RadioCard.Item>
                      ))}
                    </HStack>
                  </RadioCard.Root>
                  <FormMessage />
                </FormItem>
              )}
            />

            {course && (
              <FormField
                control={form.control}
                name="college"
                render={({ field }) => (
                  <FormItem>
                    <RadioCard.Root
                      align="center"
                      variant={"surface"}
                      name={field.name}
                      value={field.value}
                      onValueChange={(e) => field.onChange(e.value)}
                    >
                      <RadioCard.Label asChild>
                        <FormLabel>College</FormLabel>
                      </RadioCard.Label>
                      <HStack align="stretch">
                        {collegeListPending
                          ? Array.from({ length: 4 }).map((_, i) => (
                              <Skeleton key={i} h={"14"} minW={"200px"} />
                            ))
                          : collegeList.map((item) => (
                              <RadioCard.Item
                                key={item.value}
                                value={item.value}
                              >
                                <RadioCard.ItemHiddenInput
                                  onBlur={field.onBlur}
                                />
                                <RadioCard.ItemControl>
                                  <Icon fontSize="lg" color="fg.muted">
                                    <LuBuilding />
                                  </Icon>
                                  <RadioCard.ItemText>
                                    {item.option}
                                  </RadioCard.ItemText>
                                  <RadioCard.ItemIndicator />
                                </RadioCard.ItemControl>
                              </RadioCard.Item>
                            ))}
                      </HStack>
                    </RadioCard.Root>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {course && college && (
              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <RadioCard.Root
                      align="center"
                      variant={"surface"}
                      name={field.name}
                      value={field.value}
                      onValueChange={(e) => field.onChange(e.value)}
                    >
                      <RadioCard.Label asChild>
                        <FormLabel>Branch</FormLabel>
                      </RadioCard.Label>
                      <HStack flexShrink={"0"} flexWrap={"wrap"}>
                        {branchListPending
                          ? Array.from({ length: 4 }).map((_, i) => (
                              <Skeleton key={i} h={"14"} minW={"200px"} />
                            ))
                          : branchList.map((item) => (
                              <RadioCard.Item
                                key={item.value}
                                value={item.value}
                                minW={"3xs"}
                                minH={"80px"}
                              >
                                <RadioCard.ItemHiddenInput
                                  onBlur={field.onBlur}
                                />
                                <RadioCard.ItemControl>
                                  <Icon fontSize="lg" color="fg.muted">
                                    <LuBox />
                                  </Icon>
                                  <RadioCard.ItemText>
                                    {item.option}
                                  </RadioCard.ItemText>
                                  <RadioCard.ItemIndicator />
                                </RadioCard.ItemControl>
                              </RadioCard.Item>
                            ))}
                      </HStack>
                    </RadioCard.Root>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <ButtonGroup>
              <Steps.PrevTrigger asChild>
                <Button variant={"subtle"}>Prev</Button>
              </Steps.PrevTrigger>
              <Button type="submit">Next</Button>
            </ButtonGroup>
          </form>
        </Box>
      </Form>
    </React.Fragment>
  );
}

const facilitiesSchema = z.object({
  fixedFee: z.number(),

  hostelFacility: z.boolean().default(false),
  busFacility: z.boolean().default(false),
});

export function FacilitiesForm() {
  const defaultValues = useEnquiryStore((state) => state.facilities);
  const college = useEnquiryStore((state) => state.courseSelection.college);
  const branch = useEnquiryStore((state) => state.courseSelection.branch);
  const form = useForm<z.infer<typeof facilitiesSchema>>({
    resolver: zodResolver(facilitiesSchema),
    defaultValues,
  });
  const fixedFee = useAppSelector((state) => state.admissions.fee.data);
  const isLoading = useAppSelector((state) => state.admissions.fee.pending);

  const steps = useStepsContext();
  const updateStore = useEnquiryStore((s) => s.update);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (college && branch) {
      dispatch(fetchFeeQouted({ college, branch }));
    }
  }, [college, branch]);

  useEffect(() => {
    form.reset({ fixedFee });
  }, [fixedFee]);

  async function onSubmit(values: z.infer<typeof facilitiesSchema>) {
    updateStore("facilities", values);
    steps.goToNextStep();
  }

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  return (
    <React.Fragment>
      <Form {...form}>
        <Box asChild spaceY="6">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="fixedFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Final Fixed Fee Amount</FormLabel>
                  <Heading size={"4xl"}>
                    {field.value.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </Heading>
                  <FormMessage />
                </FormItem>
              )}
            />

            <VStack alignItems={"start"} w={"full"}>
              <Text>Other Facilities</Text>

              <SimpleGrid
                minBlockSize={"64px"}
                w={"xl"}
                minChildWidth={"80px"}
                gap="2"
              >
                <FormField
                  control={form.control}
                  name="busFacility"
                  render={({ field }) => (
                    <FormItem>
                      <CheckboxCard.Root
                        name={field.name}
                        align="center"
                        w={"full"}
                        orientation={"vertical"}
                        variant={"surface"}
                        checked={field.value}
                        onCheckedChange={(e) => field.onChange(e.checked)}
                      >
                        <CheckboxCard.HiddenInput onBlur={field.onBlur} />
                        <CheckboxCard.Control>
                          <CheckboxCard.Content flexDir={"row"}>
                            <Icon fontSize={"2xl"} color={"fg.muted"}>
                              <LuBusFront />
                            </Icon>
                            <CheckboxCard.Label>
                              Bus Facility
                            </CheckboxCard.Label>
                          </CheckboxCard.Content>
                          <Float placement="top-end" offset="6">
                            <CheckboxCard.Indicator />
                          </Float>
                        </CheckboxCard.Control>
                      </CheckboxCard.Root>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hostelFacility"
                  render={({ field }) => (
                    <FormItem>
                      <CheckboxCard.Root
                        name={field.name}
                        align="center"
                        orientation={"vertical"}
                        variant={"surface"}
                        w={"full"}
                        checked={field.value}
                        onCheckedChange={(e) => field.onChange(e.checked)}
                      >
                        <CheckboxCard.HiddenInput onBlur={field.onBlur} />
                        <CheckboxCard.Control>
                          <CheckboxCard.Content flexDir={"row"}>
                            <Icon fontSize={"2xl"} color={"fg.muted"}>
                              <LuBuilding />
                            </Icon>
                            <CheckboxCard.Label>
                              Hostel Facility
                            </CheckboxCard.Label>
                          </CheckboxCard.Content>
                          <Float placement="top-end" offset="6">
                            <CheckboxCard.Indicator />
                          </Float>
                        </CheckboxCard.Control>
                      </CheckboxCard.Root>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </SimpleGrid>
            </VStack>
            <ButtonGroup>
              <Steps.PrevTrigger asChild>
                <Button variant={"subtle"}>Prev</Button>
              </Steps.PrevTrigger>
              <Button type="submit">Next</Button>
            </ButtonGroup>
          </form>
        </Box>
      </Form>
    </React.Fragment>
  );
}

const familyInfoSchema = z.object({
  fatherName: z.string().min(1, "Required"),
  motherName: z.string().min(1, "Required"),
  fatherPhone: z.string().regex(phoneRegex),
  motherPhone: z.string().regex(phoneRegex),
});

export function FamilyInfoSchema() {
  const familyInfo = useEnquiryStore((state) => state.familyInfo);
  const studentVerification = useEnquiryStore(
    (state) => state.studentVerification,
  );
  const form = useForm<z.infer<typeof familyInfoSchema>>({
    resolver: zodResolver(familyInfoSchema),
  });

  const steps = useStepsContext();
  const updateStore = useEnquiryStore((s) => s.update);

  useEffect(() => {
    if (familyInfo && studentVerification) {
      form.reset({
        ...familyInfo,
        fatherPhone: studentVerification.fatherPhone,
        motherPhone: studentVerification.motherPhone,
      });
    }
  }, [
    studentVerification.fatherPhone,
    studentVerification.motherPhone,
    form.reset,
  ]);

  async function onSubmit(values: z.infer<typeof familyInfoSchema>) {
    updateStore("familyInfo", values);
    steps.goToNextStep();
  }

  return (
    <React.Fragment>
      <Form {...form}>
        <Box asChild spaceY={"6"}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="fatherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father Name</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fatherPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father Phone Number</FormLabel>
                  <InputGroup startAddon={"+ 91"}>
                    <Input type="number" {...field} />
                  </InputGroup>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="motherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mother Name</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="motherPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mother Phone Number</FormLabel>
                  <InputGroup startAddon={"+ 91"}>
                    <Input type="number" {...field} />
                  </InputGroup>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ButtonGroup>
              <Steps.PrevTrigger asChild>
                <Button variant={"subtle"}>Prev</Button>
              </Steps.PrevTrigger>
              <Button type="submit">Next</Button>
            </ButtonGroup>
          </form>
        </Box>
      </Form>
    </React.Fragment>
  );
}

const referalSchema = z.object({
  referalSource: z.string().min(1, "Required").array(),
  councelledBy: z.string().min(1, "Required"),
  recommendedBy: z.string().min(1, "Required"),
  quotedBy: z.string().min(1, "Required"),
  category: z.string().array(),
});

export function ReferalForm() {
  const defaultValues = useEnquiryStore((state) => state.referal);
  const form = useForm<z.infer<typeof referalSchema>>({
    resolver: zodResolver(referalSchema),
    defaultValues,
  });
  const acadYear = useAppSelector((state) => state.admissions.acadYear);

  const steps = useStepsContext();

  const enquiryValues = useEnquiryStore((s) => s);

  async function onSubmit(values: z.infer<typeof referalSchema>) {
    try {
      const fd = new FormData();

      const {
        studentVerification,
        studentDetails,
        courseSelection,
        familyInfo,
        facilities,
        academicBackground,
      } = enquiryValues;

      /** Student Verification */
      fd.append("reg_no", studentVerification.regno);

      /** Student Details */
      fd.append("name", studentDetails.studentName);
      if (studentDetails.email) {
        fd.append("email", studentDetails.email);
      }
      fd.append("gender", studentDetails.gender.at(0)!);
      fd.append("phone", studentDetails.studentPhone);
      fd.append("address", studentDetails.address);
      fd.append("city", studentDetails.city);
      fd.append("state", studentDetails.state);
      fd.append("aadhar", studentDetails.aadharNumber ?? "");
      fd.append("pan", studentDetails.panNumber ?? "");

      /** Course Selection */
      fd.append("course", courseSelection.course);
      fd.append("college", courseSelection.college);
      fd.append("branch", courseSelection.branch);

      /** Final Fee & Facilities */
      fd.append("fee_quoted", facilities.fixedFee.toString());
      fd.append("hostel", facilities.hostelFacility ? "YES" : "NO");
      fd.append("transport", facilities.busFacility ? "YES" : "NO");

      /** Academic Background */
      fd.append("school_college", academicBackground.previousSchoolOrCollege);
      fd.append("pcm", academicBackground.pcmAggregate as string);
      fd.append("board", academicBackground.board.at(0)!);
      fd.append("exam", academicBackground.exam.at(0)!);
      fd.append("rank", academicBackground.rank as string);
      fd.append("percentage", academicBackground.overallPercentage);

      /** Family Info */
      fd.append("fname", familyInfo.fatherName);
      fd.append("father_no", familyInfo.fatherPhone);
      fd.append("mother_name", familyInfo.motherName);
      fd.append("mother_no", familyInfo.motherPhone);

      /** Referal Info */
      fd.append("source", values.referalSource.at(0)!);
      fd.append("counselled", values.councelledBy);
      fd.append("quoted_by", values.quotedBy);
      fd.append("recommended_by", values.recommendedBy);

      fd.append("acadyear", process.env.NEXT_PUBLIC_ACADYEAR!);
      fd.append("category", values.category.at(0)!);

      const res = await axios(
        process.env.NEXT_PUBLIC_ADMISSIONS_URL + "createenquiry.php",
        {
          data: fd,
          method: "POST",
        },
      );

      const link = document.createElement("a");
      link.href =
        process.env.NEXT_PUBLIC_ADMISSIONS_URL +
        `downloadenquiry.php?id=${res.data?.id}&acadyear=${acadYear}`;
      link.setAttribute("download", "Enquiry Copy.pdf");
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      steps.goToNextStep();
    } catch (e: any) {
      console.log(e);
      toaster.error({
        title: e.response?.data?.msg ?? "Something went wrong",
      });
    }
  }

  return (
    <React.Fragment>
      <Form {...form}>
        <Box asChild spaceY={"6"}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <SelectRoot
                    name={field.name}
                    onBlur={field.onBlur}
                    value={field.value}
                    onValueChange={({ value }) => field.onChange(value)}
                    collection={categoryOptions}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select Source of Aware" />
                    </SelectTrigger>

                    <SelectContent>
                      {categoryOptions.items.map((item) => (
                        <SelectItem item={item} key={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="referalSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referal Source</FormLabel>
                  <SelectRoot
                    name={field.name}
                    onBlur={field.onBlur}
                    value={field.value}
                    onValueChange={({ value }) => field.onChange(value)}
                    collection={sourceOptions}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select Source of Aware" />
                    </SelectTrigger>

                    <SelectContent>
                      {sourceOptions.items.map((item) => (
                        <SelectItem item={item} key={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="councelledBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Councelled By</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recommendedBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recommended By</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quotedBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quoted By</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <ButtonGroup>
              <Steps.PrevTrigger asChild>
                <Button
                  disabled={form.formState.isSubmitting}
                  variant={"subtle"}
                >
                  Prev
                </Button>
              </Steps.PrevTrigger>
              <Button loading={form.formState.isSubmitting} type="submit">
                Next
              </Button>
            </ButtonGroup>
          </form>
        </Box>
      </Form>

      {/* <pre>{JSON.stringify(enquiryValues, undefined, 2)}</pre> */}
    </React.Fragment>
  );
}

export const enquiryRootSchema = z.object({
  studentVerification: studentVerificationSchema,
  studentDetails: studentDetailsSchema,
  courseSelection: courseSelectionSchema,
  facilities: facilitiesSchema,
  academicBackground: academicBackgroundSchema,
  familyInfo: familyInfoSchema,
  referal: referalSchema,
});
