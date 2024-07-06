export type StaffMemberTypes = {
  username: string;
  roles: StaffRoles[];
  _id: string;
};

export type StaffRoles =
  | "scriptwriter"
  | "translator"
  | "headscriptwriter"
  | "editor";
