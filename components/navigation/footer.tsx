export const Footer = () => {
  return (
    <footer className="flex h-28 items-center justify-center border-t shadow-sm md:h-16 md:py-0">
      <div className="container flex items-center justify-between">
        <div className="flex w-full flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div className="leading-tight">
            <h3 className="textbase font-bold md:text-xl">Dev Jobs</h3>
            <p className="text-xs text-muted-foreground md:text-sm">
              Connecting talents with opportunities
            </p>
          </div>
          <ul className="flex items-center gap-3 text-xs text-muted-foreground md:text-sm">
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
