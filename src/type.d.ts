interface IRequiredFields {
  Name: string;
  FamilyName: string;
  NationalId: string;
  Comment: string;
  AvatarLink: string;
  NationalIdDocLink: string;
  Diagnosis: string;
  Insurance: string;
  mobileNo: string;
  emergencyMobileNo: string;
  Birthday: string;
}

interface IDataGrid {
  id: number;
  Name: string;
  FamilyName: string;
  NationalId: string;
  Avatar: string;
  NationalIdDocLink: string;
  Comment: string;
}

interface IActionItems {
  id: number;
  Name: string;
  PathologyDoc: string;
  TreatmentDoc: string;
  CommitmentDoc: string;
  MRIReportDoc: string;
  CTReportDoc: string;
  PETReportDoc: string;
  SonoReportDoc: string;
  MamoReportDoc: string;
  LabReportDoc: string;
  Comment: string;
}

interface IAuth {
  username: string;
  hashedPassword: string;
  token: string;
}

interface IDropMenu {
  diagnosisMenu: [
    {
      id: string;
      value: string;
    }
  ];

  insuranceMenu: [
    {
      id: string;
      value: string;
    }
  ];
}
