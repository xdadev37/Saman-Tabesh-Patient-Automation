interface IRequiredFields {
  Name: string;
  FamilyName: string;
  NationalId: string;
  Comment: string;
  Avatar: string;
  NationalIdDocLink: string;
  DiagnosisId: string;
  InsuranceType: string;
  phoneNumber: string;
  urgencyNumber: string;
  DateOfBirth: string;
}

interface IDataGrid {
  id: string;
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
  DiagnosisIdMenu: [
    {
      id: string;
      value: string;
    }
  ];

  InsuranceTypeMenu: [
    {
      id: string;
      value: string;
    }
  ];
}

interface IAddFile {
  id: string;
  value: string;
  description: string;
  isAvailable: boolean;
}

interface IPhysician {
  id: string;
  value: string;
}
