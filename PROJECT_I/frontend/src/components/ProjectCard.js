import { Col } from "react-bootstrap";
import Image from 'next/image'

export const ProjectCard = ({ title, description, imgUrl }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <Image src={imgUrl} width={500} height={500} alt="card url" />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span className="text-custom-light dark:text-custom-dark">{description}</span>
        </div>
      </div>
    </Col>
  )
}
