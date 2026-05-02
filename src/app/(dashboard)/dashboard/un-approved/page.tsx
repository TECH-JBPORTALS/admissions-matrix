"use client";

import { DataTable } from "@/components/ui/data-table";
import { useAppDispatch } from "@/hooks";
import { useAppSelector } from "@/store";
import { fetchUnApprovedAdmissions } from "@/store/admissions.slice";
import React, { useEffect } from "react";
import { columns } from "./columns";
import { useSearchParams } from "next/navigation";
import {
  Button,
  Center,
  Heading,
  HStack,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { MdFileDownload } from "react-icons/md";

export default function UnApproved() {
  const searchParams = useSearchParams();
  const branch = searchParams.get("br");
  const college = searchParams.get("col");

  const dispatch = useAppDispatch();

  const data = useAppSelector(
    (state) => state.admissions.unapproved_matrix.data,
  ) as [];

  const isLoading = useAppSelector(
    (state) => state.admissions.unapproved_matrix.pending,
  );

  const acadYear = useAppSelector((state) => state.admissions.acadYear);

  const Error = useAppSelector(
    (state) => state.admissions.unapproved_matrix.error,
  );

  useEffect(() => {
    college &&
      branch &&
      dispatch(
        fetchUnApprovedAdmissions({
          college: college,
          branch: branch,
        }),
      );
  }, [college, branch, dispatch]);

  if (isLoading)
    return (
      <Center flex={"1"} pb={"40"} h={"svh"}>
        <Spinner />
      </Center>
    );

  return (
    <React.Fragment>
      <HStack height={"16"} justifyContent={"space-between"}>
        <Heading size={"2xl"}>Unapproved</Heading>
        <Button variant={"subtle"} colorPalette={"teal"} size={"xs"} asChild>
          <Link
            href={`${process.env.NEXT_PUBLIC_ADMISSIONS_URL}downloadunapproved.php?college=${college}&branch=${branch}&acadyear=${acadYear}`}
            download
          >
            <MdFileDownload />
            Download (.xls)
          </Link>
        </Button>
      </HStack>
      <DataTable columns={columns} data={data} />
    </React.Fragment>
  );
}
