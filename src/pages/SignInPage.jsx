import Button from '../components/Button';
import Header from '../components/Header';

export default function SignInPage() {
  const handleGitHubSignIn = () => {
    console.log('GitHub Sign In');
  };

  return (
    <>
      <Header />

      <div>
        <h2>Sign in to your account</h2>

        <div>
          <Button onClick={handleGitHubSignIn}>Sign in with GitHub</Button>
        </div>
      </div>
    </>
  );
}
