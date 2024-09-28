import React from 'react'
import Navbar from '../../common/navbar/Navbar';

const Form = () => {
    const cardData = [
        {
          title: "Today's Money",
          value: "$53,000",
          percentage: "+55%",
          icon: "ni ni-money-coins",
          iconColor: "bg-gradient-primary",
          percentageColor: "text-success"
        },
        {
          title: "Today's Users",
          value: "2,300",
          percentage: "+3%",
          icon: "ni ni-world",
          iconColor: "bg-gradient-primary",
          percentageColor: "text-success"
        },
        {
            title: "Today's Users",
            value: "2,300",
            percentage: "+3%",
            icon: "ni ni-world",
            iconColor: "bg-gradient-primary",
            percentageColor: "text-success"
          },
          {
            title: "Today's Users",
            value: "2,300",
            percentage: "+3%",
            icon: "ni ni-world",
            iconColor: "bg-gradient-primary",
            percentageColor: "text-success"
          }
      ];

  return (
    <React.Fragment>
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
            <Navbar/>
        <div className="container-fluid py-4">
      <div className="row">
        {cardData.map((card, index) => (
          <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4" key={index}>
            <div className="card">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-8">
                    <div className="numbers">
                      <p className="text-sm mb-0 text-capitalize font-weight-bold">{card.title}</p>
                      <h5 className="font-weight-bolder mb-0">
                        {card.value}
                        <span className={`${card.percentageColor} text-sm font-weight-bolder`}>{card.percentage}</span>
                      </h5>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div className={`icon icon-shape ${card.iconColor} shadow text-center border-radius-md`}>
                      <i className={`${card.icon} text-lg opacity-10`} aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
        </main>
    </React.Fragment>
  )
}

export default Form
