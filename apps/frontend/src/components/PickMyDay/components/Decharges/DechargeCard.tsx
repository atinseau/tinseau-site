import React, { memo } from "react";
import { Button } from "src/components/Library";
import Picture from "src/components/Library/Picture";


interface Props {
  decharge: TTDDecharge
}

const DechargeCard: React.FC<Props> = ({ decharge }) => {

  console.log(decharge)

  return <li className="decharges__card">
    <div className="decharges__card__header">
      <Picture image={decharge.data.car.images[0]} width={100} height={50} />
    </div>
    <div className="decharges__card__body">
      <div className="decharges__card__body__info">
        <h6><strong>Marque: </strong>{decharge.data.car.brand}</h6>
        <h6><strong>Model: </strong>{decharge.data.car.model}</h6>
        <h6><strong>Pour: </strong>{decharge.data.fullname}</h6>
      </div>
      <Button onClick={() => console.log(decharge)}>Utiliser</Button>
    </div>
  </li>
}

export default memo(DechargeCard);