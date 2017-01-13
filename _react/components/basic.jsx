
var MyComponent = React.createClass({
  render() {
    return (
      <div className="comp">
          Hello, world! {this.props.msg}
          <p> {this.props.children} </p>
      </div>
    );
  }
});

ReactDOM.render(
  <MyComponent msg="First text here">Lorem ipsum</MyComponent>,
  document.getElementById('content')
);

