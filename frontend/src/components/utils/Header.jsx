import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

import HeaderNetwrokDropdown from "./HeaderNetwrokDropdown";
import HeaderNavDropdown from "./HeaderNavDropdown";
import Search from "../utils/Search";

export default () => {
  const router = useRouter();
  return (
    <Container fluid className="header-container">
      <Row noGutters>
        <Col xs="2" className="px-0 d-md-none align-self-center">
          <Link href="/">
            <a>
              <img
                className="near-main-logo-mobile"
                src="/static/images/near_logo.svg"
              />
            </a>
          </Link>
        </Col>

        <Col md="auto" xs="6" className="pl-0  d-none d-md-block ">
          <Link href="/">
            <a>
              <img
                className="near-main-logo"
                src="/static/images/near_logo.svg"
              />
            </a>
          </Link>
        </Col>

        <Col className="align-self-center mb-3 mt-3" md="auto">
          <HeaderNetwrokDropdown />
        </Col>

        <Col className="align-self-center mb-3 mt-3" md="6">
          {router.pathname !== "/" && <Search />}
        </Col>

        <Col
          className="align-self-center mb-3 mt-3"
          style={{ textAlign: "center" }}
        >
          <Link href="/">
            <a className="near-home">Home</a>
          </Link>
        </Col>

        <Col className="align-self-center mb-3 mt-3" md="auto">
          <HeaderNavDropdown />
        </Col>
      </Row>
      <style jsx global>{`
        .header-container {
          padding: auto 5px;
          width: 100%;
          background: #ffffff;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
        }

        .near-main-logo {
          width: 180px !important;
          padding: 14px;
        }

        .near-home {
          font-weight: 500;
          color: #000000;
          margin: auto;
        }
      `}</style>
    </Container>
  );
};
