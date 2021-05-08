interface IRequiredFields {
  Name: string;
  FamilyName: string;
  NationalId: number;
  FileNumber: number;
  Avatar: string;
}

interface IOptionalFields {
  NationalIdDoc: string;
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
