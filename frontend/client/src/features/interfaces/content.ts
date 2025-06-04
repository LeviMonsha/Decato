interface Section {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  image?: {
    url: string;
    alt?: string;
  };
}

interface AdditionalInfo {
  references?: string[];
  glossary?: Record<string, string>;
  notes?: string;
  related_topics?: string[];
}

export interface TheoryContent {
  title?: string;
  chapter?: string;
  sections?: Section[];
  additional_info?: AdditionalInfo;
}
