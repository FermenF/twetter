export enum PostgresErrorCode {
  UniqueViolation = '23505',
  CheckViolation = '23514',
  NotNullViolation = '23502',
  ForeignKeyViolation = '23503'
};

export enum UniqueValidationAttr {
  UniqueEmail = 'UQ_user_email',
  UniqueUsername = 'UQ_user_username',
  UniquePhone = 'UQ_user_phone'
};


export function ValidationUnique(constraitError:string): string {
  let msg:string = "";

  if(constraitError == UniqueValidationAttr.UniqueEmail){
      return msg = "Use a different email";
  }

  if(constraitError == UniqueValidationAttr.UniquePhone){
      return msg = "Use a different phone";
  }

  if(constraitError == UniqueValidationAttr.UniqueUsername){
      return msg = "Use a different username";
  }
  return msg;
}