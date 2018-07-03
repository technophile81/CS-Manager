import React from "react"
import { Link, withRouter } from "react-router-dom";
import axios from "axios"

class PostMaterial extends React.Component {
  state = {
    materialSKU: "",
    materialName: ""
  }
  handleInputChange = event => {
      const {name, value} = event.target;
      console.log(name);
      this.setState({ [name]: value});
  }
  postMaterial = event => {
    event.preventDefault();
    const { materialSKU, materialName } = this.state;
    axios.post("/api/materials", {materialSKU, materialName}).then(res => {
      console.log(res);
      this.setState({ materialSKU: "", materialName: ""});
      this.props.history.push("/");
    })
  }
render(){
  return (
    <div>
      <Link to="/">Home</Link>
      <form>
        <input name="title" onChange={this.handleInputChange}  value={this.materialSKU} />
        <textarea name="body" onChange={this.handleInputChange} value={this.materialName} />
        <button onClick={this.postMaterial}>Submit</button>
      </form>
    </div>
  );
}

}

export default withRouter(PostMaterial);
