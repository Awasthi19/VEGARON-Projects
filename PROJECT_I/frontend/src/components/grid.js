import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import TrackVisibility from "react-on-screen";
import Image from "next/image";

export const Grid = () => {
  const projects = [
    {
      title: "Masik Billing",
      description: "Monthly Billing System",
      imgUrl: "/img/project-img1.png",
    },
    {
      title: "Statement",
      description: "Detailed Transaction History",
      imgUrl: "/img/project-img1.png",
    },
    {
      title: "Load Meter Reading",
      description: "Automated Meter Readings",
      imgUrl: "/img/project-img1.png",
    },
    {
      title: "Customer Registration",
      description: "Add New Customers Easily",
      imgUrl: "/img/project-img1.png",
    },
    {
      title: "Edit Customer",
      description: "Modify Customer Details",
      imgUrl: "/img/project-img1.png",
    },
    {
      title: "Setup",
      description: "System Configuration and Setup",
      imgUrl: "/img/project-img1.png",
    },
  ];

  return (
      <section
        className="project dark:bg-custom-dark dark:text-custom-dark text-custom-light"
        id="projects"
      >
        <Container>
          <Row>
            <Col size={12}>
              <h2>Dashboard</h2>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div
                    className={
                      isVisible ? "animate__animated animate__fadeIn" : ""
                    }
                  >
                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                      <Tab.Content
                        id="slideInUp"
                        className={
                          isVisible
                            ? "animate__animated animate__slideInUp"
                            : ""
                        }
                      >
                        <Tab.Pane eventKey="first">
                          <Row>
                            {projects.map((project, index) => {
                              return <ProjectCard key={index} {...project} />;
                            })}
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="section">
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Cumque quam, quod neque provident velit, rem
                            explicabo excepturi id illo molestiae blanditiis,
                            eligendi dicta officiis asperiores delectus quasi
                            inventore debitis quo.
                          </p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Cumque quam, quod neque provident velit, rem
                            explicabo excepturi id illo molestiae blanditiis,
                            eligendi dicta officiis asperiores delectus quasi
                            inventore debitis quo.
                          </p>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>
                )}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>
      

  );
};
