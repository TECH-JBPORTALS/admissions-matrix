import { IconButton, Tag } from "@chakra-ui/react";
import { AiOutlineDownload } from "react-icons/ai";
import { useAppSelector } from "@/store";
import Link from "next/link";

// const CustomUnApproveViewButton = (data: any) => {
//   return (
//     <div className="flex hover:cursor-pointer hover:scale-110 active:scale-95 justify-center items-center text-2xl text-green-500 h-full w-full">
//       <ViewUnApprovedAdmModal admissionno={data.value.admission_id}>
//         {({ onOpen }) => <AiOutlineCheckSquare onClick={onOpen} />}
//       </ViewUnApprovedAdmModal>
//     </div>
//   );
// };

// const CustomSearchButton = (data: any) => {
//   return (
//     <div
//       className={
//         "flex hover:cursor-pointer hover:scale-110 active:scale-95 justify-center items-center text-2xl h-full w-full " +
//         (data.value.status == "APPROVED"
//           ? " text-green-500"
//           : " text-orange-500")
//       }
//     >
//       <ViewAdmissionDetailsModal admissionno={data.value.admission_id}>
//         {({ onOpen: VeiwAdOpen }) => (
//           <ViewUnApprovedAdmModal admissionno={data.value.admission_id}>
//             {({ onOpen: ViewUnAdOpen }) => (
//               <AiOutlineEye
//                 onClick={() => {
//                   data.value.status == "APPROVED"
//                     ? VeiwAdOpen()
//                     : ViewUnAdOpen();
//                 }}
//               />
//             )}
//           </ViewUnApprovedAdmModal>
//         )}
//       </ViewAdmissionDetailsModal>
//     </div>
//   );
// };

const DownloadProvisional = (data: { value: any }) => {
  const acadYear = useAppSelector((state) => state.admissions.acadYear);
  return (
    <div className="flex hover:cursor-pointer hover:scale-110 active:scale-95 justify-center items-center text-2xl text-brand h-full w-full">
      <IconButton
        aria-label="Download Provisional"
        variant={"ghost"}
        colorScheme={"green"}
        asChild
      >
        <Link
          download
          target={"_blank"}
          href={
            process.env.NEXT_PUBLIC_ADMISSIONS_URL +
            `downloadprovisional.php?admissionno=${data.value.admission_id}&acadyear=${data.value.acadyear}`
          }
        >
          <AiOutlineDownload className={"text-2xl"} />
        </Link>
      </IconButton>
    </div>
  );
};

const StatusView = (data: { value: any }) => {
  return (
    <div className="flex justify-center items-center font-medium text-brand h-full w-full">
      {data.value == "APPROVED" ? (
        <Tag.Root fontWeight={"medium"} colorScheme="whatsapp" size={"md"}>
          <Tag.Label>Approved</Tag.Label>
        </Tag.Root>
      ) : (
        <Tag.Root fontWeight={"medium"} colorScheme="orange" size={"md"}>
          <Tag.Label>Un-Approved</Tag.Label>
        </Tag.Root>
      )}
    </div>
  );
};

export const columns = [
  {
    field: "",
    pinned: "left",
    headerName: "Download",
    width: "120px",
    cellRenderer: DownloadProvisional,
    valueGetter: (params: any) => {
      return params.data;
    },
  },
  {
    field: "",
    pinned: "left",
    headerName: "View",
    width: "90px",
    // cellRenderer: CustomViewButton,
    valueGetter: (params: any) => {
      return params.data;
    },
  },
  {
    field: "sl_no",
    headerName: "Sl No.",
    filter: true,
    pinned: "left",
    resizable: true,
    suppressMovable: true,
    width: "90px",
    cellStyle: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
  },
  {
    field: "admission_id",
    headerName: "App No.",
    filter: true,
    pinned: "left",
    resizable: true,
    suppressMovable: true,
    width: "120px",
    cellStyle: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
  },
  {
    field: "name",
    headerName: "Name",
    resizable: true,
    width: "140px",
    suppressMovable: true,
  },
  {
    field: "father_name",
    headerName: "Father Name",
    width: "160px",
  },
  {
    field: "phone_no",
    headerName: "Phone No.",
    width: "120px",
  },
  {
    field: "fee_fixed",
    headerName: "Fixed",
    width: "100px",
  },
  {
    field: "fee_paid",
    headerName: "Paid",
    width: "100px",
  },
  {
    field: "remaining_amount",
    headerName: "Payable",
    width: "100px",
  },
  {
    field: "referred_by",
    headerName: "Referred By",
    width: "150px",
  },
  {
    field: "approved_by",
    headerName: "Approved By",
    width: "150px",
  },
];

export const hostelcolumns = [
  {
    field: "sl_no",
    headerName: "Sl No.",
    filter: true,
    pinned: "left",
    resizable: true,
    suppressMovable: true,
    width: "90px",
    cellStyle: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
  },
  {
    field: "admission_id",
    headerName: "App No.",
    filter: true,
    pinned: "left",
    resizable: true,
    suppressMovable: true,
    width: "120px",
    cellStyle: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
  },
  {
    field: "name",
    headerName: "Name",
    filter: true,
    resizable: true,
    suppressMovable: true,
  },
  {
    field: "father_name",
    headerName: "Father Name",
    width: "180px",
  },
  {
    field: "phone_no",
    headerName: "Phone No.",
    width: "120px",
  },
  {
    field: "email",
    headerName: "Email",
    width: "180px",
    resizable: true,
  },
  {
    field: "",
    headerName: "View",
    width: "120px",
    valueGetter: (params: any) => {
      return params.data;
    },
  },
];

export const UnAprrovedColumns = [
  {
    field: "slno",
    headerName: "Sl No.",
    filter: true,
    pinned: "left",
    resizable: true,
    suppressMovable: true,
    width: "90px",
    cellStyle: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
  },
  {
    field: "admission_id",
    headerName: "App No.",
    filter: true,
    pinned: "left",
    resizable: true,
    suppressMovable: true,
    width: "120px",
    cellStyle: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
  },
  {
    field: "name",
    headerName: "Name",
    filter: true,
    resizable: true,
    suppressMovable: true,
    width: "160px",
  },
  {
    field: "father_name",
    headerName: "Father Name",
    width: "160px",
  },
  {
    field: "phone_no",
    headerName: "Phone No.",
    width: "120px",
  },
  {
    field: "email",
    headerName: "Email",
    width: "160px",
    resizable: true,
  },
  {
    field: "enquiry_date",
    headerName: "Enquiry Date",
    filter: true,
    width: "160px",
  },
  {
    field: "",
    headerName: "Approve",
    width: "100px",
    // cellRenderer: CustomUnApproveViewButton,
    valueGetter: (params: any) => {
      return params.data;
    },
  },
];

export const UnAprrovedColumnsWithRemarks = [
  {
    field: "slno",
    headerName: "Sl No.",
    filter: true,
    pinned: "left",
    resizable: true,
    suppressMovable: true,
    width: "90px",
    cellStyle: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
  },
  {
    field: "admission_id",
    headerName: "App No.",
    filter: true,
    pinned: "left",
    resizable: true,
    suppressMovable: true,
    width: "120px",
    cellStyle: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
  },
  {
    field: "name",
    headerName: "Name",
    filter: true,
    resizable: true,
    suppressMovable: true,
    width: "160px",
  },
  {
    field: "father_name",
    headerName: "Father Name",
    width: "160px",
  },
  {
    field: "phone_no",
    headerName: "Phone No.",
    width: "120px",
  },
  {
    field: "email",
    headerName: "Email",
    width: "160px",
    resizable: true,
  },
  {
    field: "enquiry_date",
    headerName: "Enquiry Date",
    filter: true,
    width: "160px",
  },
  {
    field: "remarks",
    headerName: "Remarks",
    filter: true,
    width: "140px",
  },
  {
    field: "",
    headerName: "Approve",
    width: "100px",
    // cellRenderer: CustomUnApproveViewButton,
    valueGetter: (params: any) => {
      return params.data;
    },
  },
];

export const SearchColumns = [
  {
    field: "",
    pinned: "left",
    headerName: "Actions",
    width: "120px",
    height: "80px",
    // cellRenderer: CustomSearchButton,
    valueGetter: (params: any) => {
      return params.data;
    },
  },
  {
    field: "sl_no",
    headerName: "Sl No.",
    filter: true,
    pinned: "left",
    resizable: true,
    suppressMovable: true,
    width: "90px",
    cellStyle: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
  },
  {
    field: "admission_id",
    headerName: "App No.",
    height: "80px",
    filter: true,
    pinned: "left",
    resizable: true,
    suppressMovable: true,
    width: "120px",
    cellStyle: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
  },
  {
    field: "name",
    height: "80px",
    headerName: "Name",
    filter: true,
    resizable: true,
    suppressMovable: true,
    width: "160px",
    cellStyle: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
  },
  {
    field: "college",
    headerName: "College",
    height: "80px",
    filter: true,
    width: 120,
    resizable: true,
    suppressMovable: true,
    cellStyle: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
  },
  {
    field: "branch",
    headerName: "Branch",
    width: 120,
    filter: true,
    height: "80px",
    resizable: true,
    suppressMovable: true,
    cellStyle: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
  },
  {
    field: "father_name",
    headerName: "Father Name",
    width: "160px",
    height: "80px",
    cellStyle: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
  },
  {
    field: "phone_no",
    headerName: "Phone No.",
    width: "120px",
    height: "80px",
    cellStyle: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: "160px",
    height: "80px",
    resizable: true,
  },
  {
    field: "status",
    headerName: "Status",
    height: "80px",
    filter: true,
    width: "180px",
    cellRenderer: StatusView,
  },
];
