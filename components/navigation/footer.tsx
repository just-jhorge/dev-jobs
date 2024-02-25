export const Footer = () => {
  return (
    <footer className="border-t shadow-sm">
      <div className="m-auto flex flex-col items-center justify-between gap-3 px-3 py-5">
        <div className="flex w-full items-center justify-between">
          <div className="leading-tight">
            <h3 className="text-xl font-bold">Dev Jobs</h3>
            <p className="text-sm text-muted-foreground">
              Connecting talents with opportunities
            </p>
          </div>
          <ul className="flex items-center gap-3 text-muted-foreground">
            <li>About Us</li>
            <li>Contact</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()}. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
