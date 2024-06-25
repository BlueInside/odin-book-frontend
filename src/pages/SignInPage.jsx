export default function SignInPage() {
  const handleGitHubSignIn = () => {
    console.log('GitHub Sign In');
  };

  return (
    <>
      <h1>Sign in to your account</h1>
      <button onClick={handleGitHubSignIn}>Sign in with GitHub</button>
    </>
  );
}
