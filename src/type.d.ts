interface IRequiredFields {
  Name: string;
  FamilyName: string;
  NationalId: string;
  FileNumber: string;
  Comment: string;
  AvatarLink: string;
  NationalIdDoc: string;
}

interface IDataGrid {
  id: number;
  Name: string;
  FamilyName: string;
  NationalId: string;
  FileNumber: string;
  Avatar: string;
  NationalIdDoc: string;
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
