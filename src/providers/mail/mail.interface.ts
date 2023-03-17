export interface MailOptions {
  to: string;
  subject: string;
  template: string;
  context: {
    [x: number | string]: string;
  };
}
