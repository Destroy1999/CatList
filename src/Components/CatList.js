import React from "react";
import "./CatList.css"

class CatList extends React.Component {
    state={
        cats: [],
        catCategories:[],
        navCollapsed: true,
        imagesViewCount: 10,
        imagesViewCotegories: 0.
    }

    componentDidMount(){
        fetch(`https://api.thecatapi.com/v1/images/search?limit=${this.state.imagesViewCount}&page=1&category_ids=${this.state.imagesViewCotegories}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({
                cats: data
            })
        });

        fetch('https://api.thecatapi.com/v1/categories')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({
                catCategories: data
            })
        });
    }

    navOpenCloseFun = ()=> {
        this.setState({
            navCollapsed: !this.state.navCollapsed,
        })
    }

    showMoreImages = () => {
        this.setState({
            imagesViewCount: this.state.imagesViewCount + 10,
        })
        setTimeout(()=>{
            this.componentDidMount()
        },500)
    }

    changeCategories = (e) => {
        this.setState({
            imagesViewCotegories: e,
            imagesViewCount: 10,
        })
        setTimeout(()=>{
            this.componentDidMount()
        },500)
    }

    render(){
        return(
            <>

                {this.state.navCollapsed ?
                <nav className={"catCategories"}>
                <div onClick={this.navOpenCloseFun} className={"navClose"}>×</div>
                    <ul>
                        {this.state.catCategories.map( (elem,index)=>{
                            return(
                                <li 
                                    onClick={this.changeCategories.bind(this, elem.id)}
                                    key={index}>
                                    {elem.name}
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                :
                <div onClick={this.navOpenCloseFun} className={"navOpen"}>🡄</div>
                }
            

                <div className={"showCats"}>

                    <div className={"imagesContainer"}>
                        {this.state.cats.length < 1 ?
                        <h1 className={"helpInfo"}>Please select a categories 🡆</h1>
                        :
                        this.state.cats.map( (elem,index)=>{ 
                            return(
                                <img 
                                    src={elem.url} 
                                    key={index} 
                                    alt={elem.name} 
                                    width={window.screen.width/4} 
                                    height={window.screen.width/4}
                                />
                            )
                        })
                        }

                    </div>

                    {this.state.cats.length < 1 ?
                    null
                    :
                    <div className={"showMore"} onClick={this.showMoreImages}>Show more images</div>
                    }

                </div>

            </>
        )
    }
}

export default CatList