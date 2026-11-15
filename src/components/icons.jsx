// Iconos propios del sitio (trazo de 1.6, 24×24). Los del tema siguen
// viniendo de lucide-react en Navbar.jsx.

function Icon({ size = 18, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function IconMenuDots(props) {
  return (
    <Icon {...props}>
      <circle cx="7" cy="7" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="17" cy="7" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="17" cy="17" r="1.6" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function IconClose(props) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  );
}

export function IconPlay(props) {
  return (
    <Icon {...props}>
      <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function IconPause(props) {
  return (
    <Icon {...props}>
      <path d="M8.5 5.5v13M15.5 5.5v13" strokeWidth="2.4" />
    </Icon>
  );
}

export function IconCheck(props) {
  return (
    <Icon {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </Icon>
  );
}

export function IconPending(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="5" strokeDasharray="2.6 2.6" />
    </Icon>
  );
}

export function IconTarget(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="6.5" />
      <path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4" />
    </Icon>
  );
}

export function IconLink(props) {
  return (
    <Icon {...props}>
      <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.700-5.700l-1 1" />
      <path d="M14 10a4 4 0 00-5.700 0l-3 3a4 4 0 005.700 5.700l1-1" />
    </Icon>
  );
}

export function IconContrast(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 010 16z" fill="currentColor" stroke="none" />
    </Icon>
  );
}
