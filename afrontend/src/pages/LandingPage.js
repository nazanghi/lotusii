import React from 'react'
import Hero from '../components/Hero'
//create a style to import


export default ({children }) => {
    return (
        <div className = "landing-page flex-row">
            <section className ="left flex-sm flex-col">
                <div className ="mask flex-col">
                    <div className="content-wrapper flex-row">
                        <h3 className="logo">aww yee comeback time</h3>
                        <div className="hero-wrapper flex-row">
                            <div className="cl-left flex-col">
                                <Hero/>
                            </div>
                            <div className="cl-right flex-col">
                                <div ClassName="path-wrapper">
                                    {/* <img src={} alt="" />
                                    placeholder for something cool */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image-wrapper">
                    {/* another image here */}
                </div>
            </section>
            <section className = "right flex-sm">
                {children}
            </section>
        </div>
    )
}