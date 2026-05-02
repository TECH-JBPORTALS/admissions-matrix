"use client";
import {
  Breadcrumb,
  Button,
  ButtonGroup,
  Center,
  HStack,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useParams } from "next/navigation";
import { trpc } from "@/utils/trpc-cleint";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import React from "react";
import { useAppSelector } from "@/store";
import { MdFileDownload } from "react-icons/md";
import { AiFillFileExcel } from "react-icons/ai";
import {
  MenuContent,
  MenuItem,
  MenuItemText,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { ChevronDown } from "lucide-react";
import { LuChevronDown, LuFileSpreadsheet } from "react-icons/lu";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";

export default function Home() {
  const params = useParams<{ college: string; branch: string }>();
  const { data, isLoading } = trpc.searchClass.useQuery({
    acadyear: process.env.NEXT_PUBLIC_ACADYEAR!,
    branch: params.branch,
    college: params.college,
  });
  const acadYear = useAppSelector((state) => state.admissions.acadYear);

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  return (
    <React.Fragment>
      <HStack justifyContent={"space-between"}>
        {/* BreadCrumbs  */}
        <Breadcrumb.Root variant={"underline"}>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link asChild>
                <Link href={"/dashboard/approved"}>Overall</Link>
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link asChild>
                <Link href={`/dashboard/approved/${params.college}`}>
                  {params.college}
                </Link>
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.CurrentLink>{params.branch}</Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
        <MenuRoot>
          <MenuTrigger asChild>
            <ButtonGroup attached variant={"outline"} size={"xs"}>
              <Button asChild>
                <Link
                  href={`${process.env.NEXT_PUBLIC_ADMISSIONS_URL}downloadclasspdf.php?college=${params.college}&branch=${params.branch}&acadyear=${acadYear}`}
                  download
                  target="_blank"
                >
                  <MdFileDownload />
                  Download
                </Link>
              </Button>
              <IconButton>
                <LuChevronDown />
              </IconButton>
            </ButtonGroup>
          </MenuTrigger>
          <MenuContent>
            <MenuItem value="pdf" asChild>
              <Link
                href={`${process.env.NEXT_PUBLIC_ADMISSIONS_URL}downloadclasspdf.php?college=${params.college}&branch=${params.branch}&acadyear=${acadYear}`}
                download
                target="_blank"
              >
                <Text color={"red.500"}>
                  <FaFilePdf />
                </Text>
                Download as (.pdf)
              </Link>
            </MenuItem>
            <MenuItem value="excel" asChild>
              <Link
                href={`${process.env.NEXT_PUBLIC_ADMISSIONS_URL}dowloadclassexcel.php?college=${params.college}&branch=${params.branch}&acadyear=${acadYear}`}
                download
                target="_blank"
              >
                <Text color={"teal.500"}>
                  <FaFileExcel />
                </Text>
                Download as (.xls)
              </Link>
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      </HStack>

      <DataTable columns={columns} data={data?.data ?? []} />
    </React.Fragment>
  );
}
