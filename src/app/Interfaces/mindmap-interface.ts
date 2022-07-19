export interface IMindMapData {
  id?: string;
  topic: string;
  perform_physical_exam?: string;
  display?: string;
  display_or?: string;
  display_hi?: string;
  language?: string;
  input_type?: string;
  gender?: string;
  age_min?: string;
  age_max?: string;
  pos_condition?: string;
  neg_condition?: string;
  children?: Array<IMindMapData>;
}
