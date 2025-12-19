import {
  type FC,
  type PropsWithChildren,
  type ReactNode,
  type ReactElement,
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";
import { Helmet } from "react-helmet";
import "./Scaffold.css";

interface ScaffoldProps {
  title: string;
  children: ReactNode;
  description?: string;
  disableHelmet?: boolean;
}

interface ScaffoldComponent extends FC<ScaffoldProps> {
  Header: FC<PropsWithChildren>;
  Body: FC<PropsWithChildren>;
  Footer: FC<PropsWithChildren>;
}

const FooterHeightContext = createContext<{
  footerHeight: number;
  setFooterHeight: (height: number) => void;
}>({
  footerHeight: 0,
  setFooterHeight: () => {},
});

const useFooterHeight = () => useContext(FooterHeightContext);

const isValidChild = (child: ReactNode): boolean => {
  if (!child || typeof child !== "object") return false;
  const childType = (child as ReactElement).type;
  return childType === Header || childType === Body || childType === Footer;
};

const Scaffold: ScaffoldComponent = ({
  title,
  children,
  description = "Ramzinex Markets",
  disableHelmet = false,
}) => {
  const [footerHeight, setFooterHeight] = useState(0);
  const childrenArray = Array.isArray(children) ? children : [children];
  const invalidChildren = childrenArray.filter((child) => !isValidChild(child));

  if (invalidChildren.length > 0) {
    console.error("Scaffold only accepts Header, Body, and Footer as children");
    return null;
  }

  const effectiveFooterHeight = footerHeight || 0;

  return (
    <FooterHeightContext.Provider value={{ footerHeight, setFooterHeight }}>
      <div
        role="main"
        className="scaffold-main"
        style={{
          height: `calc(100vh - ${effectiveFooterHeight}px)`,
          minHeight: `calc(100vh - ${effectiveFooterHeight}px)`,
        }}
      >
        {!disableHelmet && (
          <Helmet>
            <title>Ramzinex | {title}</title>
            <meta name="description" content={description} />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no"
            />
          </Helmet>
        )}
        {children}
      </div>
    </FooterHeightContext.Provider>
  );
};

const Header: FC<PropsWithChildren> = ({ children }) => {
  return (
    <header role="banner" className="scaffold-header">
      {children}
    </header>
  );
};

const Body: FC<PropsWithChildren> = ({ children }) => {
  return <main className="scaffold-body">{children}</main>;
};

const Footer: FC<PropsWithChildren> = ({ children }) => {
  const { setFooterHeight } = useFooterHeight();
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateFooterHeight = () => {
      if (footerRef.current) {
        const height = footerRef.current.offsetHeight;
        setFooterHeight(height);
      }
    };

    const initialTimer = setTimeout(updateFooterHeight, 50);

    const resizeObserver = new ResizeObserver(updateFooterHeight);
    if (footerRef.current) {
      resizeObserver.observe(footerRef.current);
    }

    const handleResize = () => {
      setTimeout(updateFooterHeight, 100);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      clearTimeout(initialTimer);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [setFooterHeight]);

  return (
    <footer ref={footerRef} role="contentinfo" className="scaffold-footer">
      {children}
    </footer>
  );
};

Scaffold.Header = Header;
Scaffold.Body = Body;
Scaffold.Footer = Footer;

export default Scaffold;
