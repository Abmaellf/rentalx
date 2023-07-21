

interface ICreateUserTokenDTO {
  expires_date: Date;
  refresh_token: string;
  user_id: string;
}
export { ICreateUserTokenDTO}