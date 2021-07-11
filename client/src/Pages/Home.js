import React from 'react'
import '../Styles/Home.css'
const
    Home = () => {

        const carouselStyle = {
            height: '75vh',
            width: '90vw',
            marginLeft: '5vw',
            marginTop: '20vh',

            padding: '20px,20px,20px,20px'

        }
        return (
            <div>

                <div id="carouselExampleIndicators" className="carousel slide carouselStyle" data-ride="carousel" style={carouselStyle}>
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active" style={{}}>
                            <img className="carouselImg" src="https://about.fb.com/wp-content/uploads/2020/04/Newsroom-header.png?fit=1920%2C1080"  alt="..." ></img>
                            <p className="carouselText">Builds meaningful <br />moments using<br /> video-engage-app<br /><br /><br />A new reason to <br />come together.</p>
                        </div>
                        <div className="carousel-item">
                            <img className="carouselImg"src="https://www.salesforce.com/content/dam/blogs/ca/Blog%20Posts/How%20to%20Increase%20Productivity%20Without%20Increasing%20Stress_Open%20Graph%20Image.png" alt="..." ></img>
                            <p className="carouselText">Increase productivity <br />with online<br /> collaborations</p>
                        </div>
                        <div className="carousel-item">
                            <img className="carouselImg" src="https://www.tawk.to/wp-content/uploads/2020/08/Live-chat.png"  alt="..." ></img>
                            <p className="carouselText">Do live chat<br /></p>

                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

                <div id="container">
                    <div className="lead ">
                        <h3 className="title ">The power to engage billions of people</h3>
                        <p>Use powerful video-engage-app to keep your customers close,<br /> while building your business globally. </p>
                    </div>

                    <div className="stats">
                        <ul className="row">
                            <div className="cards">
                                <li className="stats__card">
                                    <div className="stats__icon -red "><i class="bi bi-chat" style={{}}></i></div>
                                    <p> This app is bootstraped with create-react-app </p>
                                </li>
                            </div>

                            <div className="cards">
                                <li className="stats__card">
                                    <div className="stats__icon -red"></div>
                                    <p> </p>
                                </li>
                            </div>

                            <div className="col-12 col-lg-4 d-flex justify-content-center">
                                <li className="stats__card">
                                    <div className="stats__icon -red"></div>
                                    <p>All in one app,Do video call with live chat features,access the chat before as well as after the meet </p>
                                </li>
                            </div>

                        </ul>
                    </div>
                </div>

            </div>

        )
    }

export default Home
