import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from ".";
import { toaster } from "@/components/ui/toaster";

export const fetchSelectedMatrix = createAsyncThunk<
  SelectedMatrix,
  {
    admissionno: string;
    college: string;
  },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/admission/fetchSelectedMatrix",
  async (payload, { fulfillWithValue, rejectWithValue, getState }) => {
    var data;
    try {
      const formData = new FormData();
      const state = getState() as RootState;
      const acadyear = state.admissions.acadYear;
      formData.append("acadyear", acadyear);
      formData.append("admissionno", payload.admissionno);
      formData.append("college", payload.college);
      const response = await axios({
        url: process.env.NEXT_PUBLIC_ADMISSIONS_URL + "searchstudent.php",
        method: "POST",
        data: formData,
      });
      data = response.data;
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
  },
);

export const fetchSearchByAdNo = createAsyncThunk<
  SelectedMatrix[],
  {
    admissionno: string;
  },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/admission/fetchSearchByAdNo",
  async (payload, { fulfillWithValue, rejectWithValue, getState }) => {
    var data;
    try {
      const formData = new FormData();
      const state = getState() as RootState;
      const acadyear = state.admissions.acadYear;
      formData.append("acadyear", acadyear);
      formData.append("admissionno", payload.admissionno);
      const response = await axios({
        url: process.env.NEXT_PUBLIC_ADMISSIONS_URL + "searchbyid.php",
        method: "POST",
        data: formData,
      });
      data = response.data;
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
  },
);

export const fetchFeeQouted = createAsyncThunk<
  SelectedMatrix[],
  {
    college: string;
    branch: string;
  },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/admission/fetchFeeQouted",
  async (payload, { fulfillWithValue, rejectWithValue, getState }) => {
    var data;
    try {
      const formData = new FormData();
      const state = getState() as RootState;
      const acadyear = state.admissions.acadYear;
      formData.append("acadyear", acadyear);
      formData.append("college", payload.college);
      formData.append("branch", payload.branch);
      const response = await axios({
        url: process.env.NEXT_PUBLIC_ADMISSIONS_URL + "retrievefee.php",
        method: "POST",
        data: formData,
      });
      data = response.data;
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
  },
);

export const fetchSearchClass = createAsyncThunk<
  SelectedMatrix[],
  {
    college: string;
    branch: string;
  },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/admission/fetchSearchClass",
  async (payload, { fulfillWithValue, rejectWithValue, getState }) => {
    var data;
    try {
      const formData = new FormData();
      const state = getState() as RootState;
      const acadyear = state.admissions.acadYear;
      formData.append("acadyear", acadyear);
      formData.append("college", payload.college);
      formData.append("branch", payload.branch);
      const response = await axios({
        url: process.env.NEXT_PUBLIC_ADMISSIONS_URL + "searchclass.php",
        method: "POST",
        data: formData,
      });
      data = response.data;
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
  },
);

export const fetchHostelSearchClass = createAsyncThunk<
  SelectedMatrix[],
  {
    college: string;
    branch: string;
  },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/admission/fetchHostelSearchClass",
  async (payload, { fulfillWithValue, rejectWithValue, getState }) => {
    var data;
    try {
      const formData = new FormData();
      const state = getState() as RootState;
      const acadyear = state.admissions.acadYear;
      formData.append("acadyear", acadyear);
      formData.append("college", payload.college);
      formData.append("branch", payload.branch);
      const response = await axios({
        url: process.env.NEXT_PUBLIC_ADMISSIONS_URL + "retrievehostelclass.php",
        method: "POST",
        data: formData,
      });
      data = response.data;
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
  },
);

export const fetchOverallMatrix = createAsyncThunk<
  OverallMatrix[],
  { college: string },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/admissions/fetchoverallmatrix",
  async (payload, { fulfillWithValue, rejectWithValue, getState }) => {
    var data;
    try {
      const formData = new FormData();
      const state = getState() as RootState;
      const acadyear = state.admissions.acadYear;
      formData.append("acadyear", acadyear);
      formData.append("college", payload.college);
      const response = await axios(
        process.env.NEXT_PUBLIC_ADMISSIONS_URL + "retrieveoverallmatrix.php",
        {
          method: "POST",
          data: formData,
        },
      );
      data = response.data;
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
  },
);

export const fetchOverallHostel = createAsyncThunk<
  OverallMatrix[],
  { college: string },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/admissions/fetchOverallHostel",
  async (payload, { fulfillWithValue, rejectWithValue, getState }) => {
    var data;
    try {
      const formData = new FormData();
      const state = getState() as RootState;
      const acadyear = state.admissions.acadYear;
      formData.append("acadyear", acadyear);
      formData.append("college", payload.college);
      const response = await axios(
        process.env.NEXT_PUBLIC_ADMISSIONS_URL + "retrievehosteloverall.php",
        {
          method: "POST",
          data: formData,
        },
      );
      data = response.data;
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
  },
);

export const fetchBranchList = createAsyncThunk<
  { msg: string },
  {
    college: string;
  },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/admissions/fetchbranchlist",
  async (payload, { fulfillWithValue, rejectWithValue, getState }) => {
    var data;
    try {
      const formData = new FormData();
      const state = getState() as RootState;
      const acadyear = state.admissions.acadYear;
      formData.append("acadyear", acadyear);
      formData.append("college", payload.college);
      const response = await axios({
        url:
          process.env.NEXT_PUBLIC_ADMISSIONS_URL + "retrievebrancheslist.php",
        method: "POST",
        data: formData,
      });
      data = response.data;
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
  },
);

export const fetchHistory = createAsyncThunk<
  { msg: string },
  {
    college: string;
  },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/admissions/fetchHistory",
  async (payload, { fulfillWithValue, rejectWithValue, getState }) => {
    var data;
    try {
      const formData = new FormData();
      const state = getState() as RootState;
      const acadyear = state.admissions.acadYear;
      formData.append("acadyear", acadyear);
      formData.append("college", payload.college);
      const response = await axios({
        url: process.env.NEXT_PUBLIC_ADMISSIONS_URL + "seatmatrix.php",
        method: "POST",
        data: formData,
      });
      data = response.data;
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
  },
);

export const fetchCollegeList = createAsyncThunk<
  { msg: string },
  {
    course: string;
  },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/admissions/fetchCollegeList",
  async (payload, { fulfillWithValue, rejectWithValue, getState }) => {
    var data;
    try {
      const formData = new FormData();
      const state = getState() as RootState;
      const acadyear = state.admissions.acadYear;
      formData.append("acadyear", acadyear);
      formData.append("course", payload.course);
      const response = await axios({
        url: process.env.NEXT_PUBLIC_ADMISSIONS_URL + "retrievecollege.php",
        method: "POST",
        data: formData,
      });
      data = response.data;
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
  },
);

export const fetchBaseColleges = createAsyncThunk<
  { msg: string },
  void,
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/admissions/fetchBaseColleges",
  async (payload, { fulfillWithValue, rejectWithValue, getState }) => {
    var data;
    try {
      const formData = new FormData();
      const state = getState() as RootState;
      const acadyear = state.admissions.acadYear;
      formData.append("acadyear", acadyear);
      const response = await axios({
        url: process.env.NEXT_PUBLIC_ADMISSIONS_URL + "retrievecollege1.php",
        method: "POST",
        data: formData,
      });
      data = response.data;
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
  },
);

export const fetchUnApprovedAdmissions = createAsyncThunk<
  { msg: string },
  {
    college: string;
    branch: string;
  },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/admissions/fetchUnApprovedAdmissions",
  async (payload, { fulfillWithValue, rejectWithValue, getState }) => {
    var data;
    try {
      const formData = new FormData();
      const state = getState() as RootState;
      const acadyear = state.admissions.acadYear;
      formData.append("acadyear", acadyear);
      formData.append("college", payload.college);
      formData.append("branch", payload.branch);
      const response = await axios({
        url: process.env.NEXT_PUBLIC_ADMISSIONS_URL + "retrievenotapproved.php",
        method: "POST",
        data: formData,
      });
      data = response.data;
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
  },
);

export const updateMatrix = createAsyncThunk<
  { msg: string },
  {
    fee_fixed: string;
    fee_quoted: string;
    user_college: string;
    user_id: string;
  },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/admissions/updateAdmissionDetail",
  async (
    payload,
    { fulfillWithValue, rejectWithValue, getState, dispatch },
  ) => {
    var data;
    try {
      const formData = new FormData();
      const state = getState() as RootState;
      const selected_Matrix = state.admissions.selectedMatrix
        .data as SelectedMatrix;
      const acadyear = state.admissions.acadYear;

      if (!selected_Matrix)
        return rejectWithValue({ msg: "Something went wrong" });

      formData.append("user_id", payload.user_id);
      formData.append("acadyear", acadyear);
      formData.append("admissionno", selected_Matrix?.admission_id);
      formData.append("reg_no", selected_Matrix.reg_no);
      formData.append("name", selected_Matrix.name);
      formData.append("category", selected_Matrix.category);
      formData.append("college", selected_Matrix.college);
      formData.append("branch", selected_Matrix.branch);
      formData.append("fname", selected_Matrix.father_name);
      formData.append("phone", selected_Matrix.phone_no);
      formData.append("fphone", selected_Matrix.father_no);
      formData.append("mname", selected_Matrix.mother_name);
      formData.append("mphone", selected_Matrix.mother_no);
      formData.append("email", selected_Matrix.email);
      formData.append("fee_fixed", payload.fee_fixed);
      formData.append("fee_quoted", payload.fee_quoted);
      formData.append("fee_paid", selected_Matrix.fee_paid);
      formData.append("paid_date", selected_Matrix.paid_date);
      formData.append("remaining", selected_Matrix.remaining_amount);
      formData.append("aadhar_no", selected_Matrix.aadhar_no);
      formData.append("pan_no", selected_Matrix.pan_no);
      formData.append("address", selected_Matrix.address);
      formData.append("recommended_by", selected_Matrix.recommended_by);
      formData.append("due_date", selected_Matrix.due_date);
      formData.append("approved_by", selected_Matrix.approved_by);
      formData.append("referred_by", selected_Matrix.referred_by);
      formData.append(
        "counselled_quoted_by",
        selected_Matrix.counselled_quoted_by,
      );
      formData.append("remarks", selected_Matrix.remarks);
      formData.append("percentage", selected_Matrix.percentage);
      formData.append("pcm", selected_Matrix.pcm);
      formData.append("user_college", payload.user_college);
      formData.append("hostel", selected_Matrix.hostel);
      formData.append("exam", selected_Matrix.exam);
      formData.append("rank", selected_Matrix.rank);
      const response = await axios({
        url: process.env.NEXT_PUBLIC_ADMISSIONS_URL + "updatestudent.php",
        method: "POST",
        data: formData,
      });
      data = response.data;
      dispatch(
        fetchSearchClass({
          college: selected_Matrix.college,
          branch: selected_Matrix.branch,
        }),
      );
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
  },
);

export const updateEnquiry = createAsyncThunk<
  { msg: string },
  {
    username: string;
    fee_fixed: string;
    fee_quoted: string;
    user_college: string;
  },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/admissions/updateEnquery",
  async (
    payload,
    { fulfillWithValue, rejectWithValue, getState, dispatch },
  ) => {
    var data;
    try {
      const formData = new FormData();
      const state = getState() as RootState;
      const selected_Matrix = state.admissions.selectedMatrix
        .data as SelectedMatrix[];
      const name = payload.username;
      const acadyear = state.admissions.acadYear;

      if (!selected_Matrix[0])
        return rejectWithValue({ msg: "Something went wrong" });

      formData.append("acadyear", acadyear);
      formData.append("reg_no", selected_Matrix[0]?.reg_no);
      formData.append("admissionno", selected_Matrix[0]?.admission_id);
      formData.append("name", selected_Matrix[0].name);
      formData.append("rank", selected_Matrix[0].rank);
      formData.append("exam", selected_Matrix[0].exam);
      formData.append("college", selected_Matrix[0].college);
      formData.append("branch", selected_Matrix[0].branch);
      formData.append("fname", selected_Matrix[0].father_name);
      formData.append("mname", selected_Matrix[0].mother_name);
      formData.append("phone", selected_Matrix[0].phone_no);
      formData.append("mphone", selected_Matrix[0].mother_no);
      formData.append("fphone", selected_Matrix[0].father_no);
      formData.append("email", selected_Matrix[0].email);
      formData.append("fee_quoted", selected_Matrix[0].fee_quoted);
      formData.append("quoted_by", name);
      formData.append("fee_fixed", payload.fee_fixed);
      formData.append("fee_quoted", payload.fee_quoted);
      formData.append("fee_paid", selected_Matrix[0].fee_paid);
      formData.append("paid_date", selected_Matrix[0].paid_date);
      formData.append("remaining", selected_Matrix[0].remaining_amount);
      formData.append("due_date", selected_Matrix[0].due_date);
      formData.append("approved_by", selected_Matrix[0].approved_by);
      formData.append("aadhar_no", selected_Matrix[0].aadhar_no);
      formData.append("pan_no", selected_Matrix[0].pan_no);
      formData.append("address", selected_Matrix[0].address);
      formData.append("recommended_by", selected_Matrix[0].recommended_by);
      formData.append(
        "counselled_quoted_by",
        selected_Matrix[0].counselled_quoted_by,
      );
      formData.append("remarks", selected_Matrix[0].remarks);
      formData.append("percentage", selected_Matrix[0].percentage);
      formData.append("pcm", selected_Matrix[0].pcm);
      formData.append("referred_by", selected_Matrix[0].referred_by);
      formData.append("hostel", selected_Matrix[0].hostel);
      formData.append("user_college", payload.user_college);
      const response = await axios({
        url: process.env.NEXT_PUBLIC_ADMISSIONS_URL + "updateenquiry.php",
        method: "POST",
        data: formData,
      });
      dispatch(
        fetchUnApprovedAdmissions({
          college: selected_Matrix[0].college,
          branch: selected_Matrix[0].branch,
        }),
      );
      data = response.data;
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
  },
);

export const updateToApprove = createAsyncThunk<
  { msg: string },
  {
    username: string;
    fee_fixed: string;
    fee_quoted: string;
    user_college: string;
  },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/admissions/updateToApprove",
  async (
    payload,
    { fulfillWithValue, rejectWithValue, getState, dispatch },
  ) => {
    var data;
    try {
      const formData = new FormData();
      const state = getState() as RootState;
      const selected_data = state.admissions.selectedMatrix
        .data as SelectedMatrix;
      const name = payload.username;
      const acadyear = state.admissions.acadYear;
      formData.append("acadyear", acadyear);
      formData.append("name", selected_data.name);
      formData.append("reg_no", selected_data.reg_no);
      formData.append("admissionno", selected_data.admission_id);
      formData.append("category", selected_data.category);
      formData.append("college", selected_data.college);
      formData.append("category", selected_data.category);
      formData.append("branch", selected_data.branch);
      formData.append("fname", selected_data.father_name);
      formData.append("mname", selected_data.mother_name);
      formData.append("mphone", selected_data.mother_no);
      formData.append("fphone", selected_data.father_no);
      formData.append("rank", selected_data.rank);
      formData.append("exam", selected_data.exam);
      formData.append("phone", selected_data.phone_no);
      formData.append("email", selected_data.email);
      formData.append("fee_fixed", payload.fee_fixed);
      formData.append("fee_quoted", payload.fee_quoted);
      formData.append("fee_paid", selected_data.fee_paid);
      formData.append("paid_date", selected_data.paid_date);
      formData.append("due_date", selected_data.due_date);
      formData.append("approved_by", name);
      formData.append("referred_by", selected_data.referred_by);
      formData.append("quoted_by", selected_data.quoted_by);
      formData.append(
        "counselled_quoted_by",
        selected_data.counselled_quoted_by,
      );
      formData.append("remarks", selected_data.remarks);
      formData.append("percentage", selected_data.percentage);
      formData.append("status", "APPROVED");
      formData.append("user_college", payload.user_college);
      formData.append("hostel", selected_data.hostel);
      formData.append("exam", selected_data.exam);
      formData.append("rank", selected_data.rank);
      formData.append("aadhar_no", selected_data.aadhar_no);
      formData.append("pan_no", selected_data.pan_no);
      formData.append("address", selected_data.address);
      formData.append("recommended_by", selected_data.recommended_by);
      const response = await axios({
        url: process.env.NEXT_PUBLIC_ADMISSIONS_URL + "approveenquiry.php",
        method: "POST",
        data: formData,
      });
      data = response.data;
      dispatch(
        fetchUnApprovedAdmissions({
          college: selected_data.college,
          branch: selected_data.branch,
        }),
      );
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue({ msg: error.response.data.msg });
    }
  },
);

export interface BranchAdmission {
  admission_id: string;
  name: string;
  college: string;
  branch: string;
  father_name: string;
  phone_no: string;
  email: string;
  fee_fixed: string;
  fee_paid: string;
  paid_date: string;
  remaining_amount: string;
  due_date: string;
  approved_by: string;
  father_no: string;
  mother_name: string;
  mother_no: string;
}

export interface AddStudent extends Omit<
  BranchAdmission,
  "admission_id" | "approved_by"
> {
  remarks: string;
  username: string;
}

export interface FeeUpdateHistory {
  created_at: string;
  id: string;
  new_value: string;
  old_value: string;
  total_updates: number;
  user: {
    designation: string;
    email: string;
    fullname: string;
    id: string;
  };
}

export interface SelectedMatrix extends BranchAdmission {
  remarks: string;
  referred_by: string;
  total: string;
  fee_quoted: string;
  quoted_by: string;
  status: string;
  approved_date: string;
  enquiry_date: string;
  percentage: string;
  hostel: string;
  exam: string;
  rank: string;
  reg_no: string;
  counselled_quoted_by: string;
  pcm: string;
  course: string;
  aadhar_no: string;
  pan_no: string;
  address: string;
  recommended_by: string;
  category: string;
  last_updated_history: {
    fee_paid?: FeeUpdateHistory | null;
    fee_fixed?: FeeUpdateHistory | null;
  };
}

export interface OverallMatrix {
  college: string;
  total: string;
  allotted_seats: string;
  remaining_seats: string;
  filled_percentage: string;
}

export interface BranchMatrix {
  branch: string;
  total: string;
  allotted_seats: string;
  remaining_seats: string;
  filled_percentage: string;
}

interface FeesIntialState {
  fee: {
    data: number;
    pending: boolean;
    error: null | string;
  };
  acadYear: string;
  colleges: [];
  branch_admissions: {
    data: [];
    pending: boolean;
    error: null | string;
  };
  overall_matrix: {
    data: [];
    pending: boolean;
    error: null | string;
  };
  branchlist: {
    data: [];
    pending: boolean;
    error: null | string;
  };
  collegeList: {
    data: [];
    pending: boolean;
    error: null | string;
  };
  selectedMatrix: {
    data: any;
    pending: boolean;
    error: null | string;
  };
  branch_matrix: {
    data: [];
    pending: boolean;
    error: null | string;
  };
  search_class: {
    data: [];
    pending: boolean;
    error: null | string;
  };
  add_admission: {
    pending: boolean;
    error: null | string;
  };
  update_approve: {
    pending: boolean;
    error: null | string;
  };
  unapproved_matrix: {
    data: [];
    pending: boolean;
    error: null | string;
  };
  seat_matrix: {
    data: [];
    pending: boolean;
    error: null | string;
  };
}

const initialState: FeesIntialState = {
  fee: {
    data: 0,
    pending: false,
    error: null,
  },
  acadYear: process.env.NEXT_PUBLIC_ACADYEAR!,
  colleges: [],
  branch_admissions: {
    data: [],
    error: null,
    pending: false,
  },
  branchlist: {
    data: [],
    error: null,
    pending: false,
  },
  collegeList: {
    data: [],
    error: null,
    pending: false,
  },
  overall_matrix: {
    data: [],
    error: null,
    pending: false,
  },
  selectedMatrix: {
    data: undefined,
    error: null,
    pending: false,
  },
  branch_matrix: {
    data: [],
    error: null,
    pending: false,
  },
  search_class: {
    data: [],
    error: null,
    pending: false,
  },
  update_approve: {
    pending: false,
    error: null,
  },
  add_admission: {
    pending: false,
    error: null,
  },
  unapproved_matrix: {
    data: [],
    pending: false,
    error: null,
  },
  seat_matrix: {
    data: [],
    pending: false,
    error: null,
  },
};

export const AdmissionsSlice = createSlice({
  name: "admissions",
  initialState,
  reducers: {
    updateSelectedMatrix(state, action) {
      state.selectedMatrix.data = {
        ...state.selectedMatrix.data,
        ...action.payload,
      };
    },
    updateFee(state, action) {
      state.fee = action.payload;
    },
    updateAcadYear(state, action) {
      state.acadYear = action.payload;
    },
  },
  extraReducers: {
    [fetchOverallMatrix.pending.toString()]: (state, action) => {
      state.overall_matrix.pending = true;
    },
    [fetchOverallMatrix.fulfilled.toString()]: (state, action) => {
      state.overall_matrix.pending = false;
      state.overall_matrix.data = action.payload;
    },
    [fetchOverallMatrix.rejected.toString()]: (state, action) => {
      state.overall_matrix.pending = false;
      state.overall_matrix.error = action.payload?.msg;
    },
    [fetchBaseColleges.pending.toString()]: (state, action) => {
      state.colleges = [];
    },
    [fetchBaseColleges.fulfilled.toString()]: (state, action) => {
      state.colleges = action.payload;
    },
    [fetchBaseColleges.rejected.toString()]: (state, action) => {
      state.colleges = [];
    },
    [fetchOverallHostel.pending.toString()]: (state, action) => {
      state.overall_matrix.pending = true;
    },
    [fetchOverallHostel.fulfilled.toString()]: (state, action) => {
      state.overall_matrix.pending = false;
      state.overall_matrix.data = action.payload;
    },
    [fetchOverallHostel.rejected.toString()]: (state, action) => {
      state.overall_matrix.pending = false;
      state.overall_matrix.error = action.payload?.msg;
      toaster.error({ title: action.payload?.msg });
    },
    [fetchUnApprovedAdmissions.pending.toString()]: (state, action) => {
      state.unapproved_matrix.pending = true;
      state.unapproved_matrix.error = null;
    },
    [fetchUnApprovedAdmissions.fulfilled.toString()]: (state, action) => {
      state.unapproved_matrix.pending = false;
      state.unapproved_matrix.data = action.payload;
      state.unapproved_matrix.error = null;
    },
    [fetchUnApprovedAdmissions.rejected.toString()]: (state, action) => {
      state.unapproved_matrix.pending = false;
      state.unapproved_matrix.data = [];
      state.unapproved_matrix.error = action.payload?.msg;
    },
    [fetchSearchClass.pending.toString()]: (state, action) => {
      state.search_class.pending = true;
      state.search_class.error = null;
    },
    [fetchSearchClass.fulfilled.toString()]: (state, action) => {
      state.search_class.pending = false;
      state.search_class.data = action.payload;
      state.search_class.error = null;
    },
    [fetchSearchClass.rejected.toString()]: (state, action) => {
      state.search_class.pending = false;
      state.search_class.data = [];
      state.search_class.error = action.payload?.msg;
    },
    [fetchHostelSearchClass.pending.toString()]: (state, action) => {
      state.search_class.pending = true;
      state.search_class.error = null;
    },
    [fetchHostelSearchClass.fulfilled.toString()]: (state, action) => {
      state.search_class.pending = false;
      state.search_class.data = action.payload;
      state.search_class.error = null;
    },
    [fetchHostelSearchClass.rejected.toString()]: (state, action) => {
      state.search_class.pending = false;
      state.search_class.data = [];
      state.search_class.error = action.payload?.msg;
    },
    [fetchSelectedMatrix.pending.toString()]: (state, action) => {
      state.selectedMatrix.data = undefined;
      state.selectedMatrix.pending = true;
    },
    [fetchSelectedMatrix.fulfilled.toString()]: (state, action) => {
      state.selectedMatrix.pending = false;
      state.selectedMatrix.data = action.payload;
    },
    [fetchSelectedMatrix.rejected.toString()]: (state, action) => {
      state.selectedMatrix.pending = false;
      state.selectedMatrix.data = undefined;
      state.selectedMatrix.error = action.payload?.msg;
      toaster.error({ title: action.payload?.msg });
    },
    [fetchHistory.pending.toString()]: (state, action) => {
      state.seat_matrix.data = [];
      state.seat_matrix.pending = true;
    },
    [fetchHistory.fulfilled.toString()]: (state, action) => {
      state.seat_matrix.pending = false;
      state.seat_matrix.data = action.payload;
    },
    [fetchHistory.rejected.toString()]: (state, action) => {
      state.seat_matrix.pending = false;
      state.seat_matrix.data = [];
      state.seat_matrix.error = action.payload?.msg;
    },
    [fetchBranchList.pending.toString()]: (state, action) => {
      state.branchlist.pending = true;
    },
    [fetchBranchList.fulfilled.toString()]: (state, action) => {
      state.branchlist.pending = false;
      state.branchlist.data = action.payload;
    },
    [fetchBranchList.rejected.toString()]: (state, action) => {
      state.branchlist.data = [];
    },
    [fetchFeeQouted.fulfilled.toString()]: (state, action) => {
      state.fee.pending = false;
      state.fee.data = parseInt(action.payload[0]?.fee);
    },
    [fetchFeeQouted.pending.toString()]: (state, action) => {
      state.fee.pending = true;
    },
    [fetchFeeQouted.rejected.toString()]: (state, action) => {
      state.fee.data = 0;
      state.fee.pending = false;
      state.fee.error = action.payload;
    },
    [fetchCollegeList.pending.toString()]: (state, action) => {
      state.collegeList.pending = true;
    },
    [fetchCollegeList.fulfilled.toString()]: (state, action) => {
      state.collegeList.pending = false;
      state.collegeList.data = action.payload;
    },
    [fetchCollegeList.rejected.toString()]: (state, action) => {
      state.collegeList.data = [];
    },
    [updateMatrix.pending.toString()]: (state, action) => {
      state.selectedMatrix.pending = true;
    },
    [updateMatrix.fulfilled.toString()]: (state, action) => {
      toaster.success({ title: action.payload?.msg });
      state.selectedMatrix.pending = false;
    },
    [updateMatrix.rejected.toString()]: (state, action) => {
      toaster.error({ title: action.payload?.msg });
      state.selectedMatrix.pending = false;
    },
    [updateEnquiry.pending.toString()]: (state, action) => {
      state.selectedMatrix.pending = true;
    },
    [updateEnquiry.fulfilled.toString()]: (state, action) => {
      toaster.success({ title: action.payload?.msg });
      state.selectedMatrix.pending = false;
    },
    [updateEnquiry.rejected.toString()]: (state, action) => {
      toaster.error({ title: action.payload?.msg });
      state.selectedMatrix.pending = false;
    },
    [updateToApprove.pending.toString()]: (state) => {
      state.update_approve.pending = true;
    },
    [updateToApprove.fulfilled.toString()]: (state, action) => {
      state.update_approve.pending = false;
      state.update_approve.error = null;
      toaster.success({ title: action.payload?.msg });
    },
    [updateToApprove.rejected.toString()]: (state, action) => {
      state.update_approve.error = action.payload?.msg;
      state.update_approve.pending = false;
      toaster.error({ title: action.payload?.msg });
    },
  },
});

export const { updateSelectedMatrix, updateFee, updateAcadYear } =
  AdmissionsSlice.actions;
