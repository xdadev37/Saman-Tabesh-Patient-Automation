interface IRequiredFields {
  Name: string;
  FamilyName: string;
  NationalId: number;
  FileNumber: number;
}

interface IDataGrid {
  id: number;
  Name: string;
  FamilyName: string;
  NationalId: number;
  FileNumber: number;
  Avatar: string;
  NationalIdDoc: string;
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
