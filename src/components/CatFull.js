import {React, CSSProperties} from "react"

const CatFull = (props) => {

    const styles = {
        "--cat-height": `${props.catHeight}px`,
        "--cat-color": `${props.catColor}`
    }
    
    return(
        <div className="container" style={styles}>
            <div className="cat">
                <div className="face">
                    <div className="ear-l">
                        <div className="inner1"></div>

                    </div>
                    <div className="ear-r">
                        <div className="inner2"></div>
                    </div>
                    <div className="eye-l">
                        <div className="eyeball"></div>
                    </div>
                    <div className="eye-r">
                        <div className="eyeball"></div>
                    </div>
                    <div className="nose">
                        <div className="l1"></div>
                        <div className="l2"></div>
                    </div>
                </div>
                <div className="body">
                    <div className="paw-l"></div>
                    <div className="paw-r"></div>
                    <div className="tail"></div>
                </div>
                <div className="shadow"></div>
            </div>
        </div>
    )
}

export default CatFull