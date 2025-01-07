export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex h-16 items-center justify-between px-4">
        <p className="text-sm text-muted-foreground">
          © 2024 AI Room Design. All rights reserved.
        </p>
        <nav className="flex gap-4">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Terms
          </a>
        </nav>
      </div>
    </footer>
  );
}
