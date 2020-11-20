//Gotta make this

import React from ' React'
import Search from '../components/TextInput'

export default () => {
    return (
        <div className ="home content-wrapper flex-col">
            <div className="content flex-col">
                <form>
                    <Search 
                        name="search"
                        type="search"
                        placeholder="Look for a Card"
                    />
                </form>
                <div className="flex-col">
                    {/* this div HAD a className of discover, but we're changing things up */}
                    <p> who doesn't love a good comeback?</p>
                    <section className="card-wrapper flex-row">
                        
                    </section>
                </div>
            </div>
        </div>
    )
}