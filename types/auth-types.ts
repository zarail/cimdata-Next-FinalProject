export type GitHubUser = {
  name: string;
  email: string;
  image?: string;
};

declare module "next-auth" {
  interface Session {
    user: GitHubUser;
  }
}
