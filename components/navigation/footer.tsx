export const Footer = () => {
  return (
    <footer className="flex h-16 items-center justify-center border-t shadow-sm">
      <div className="container flex items-center justify-between">
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
      </div>
    </footer>
  );
};
