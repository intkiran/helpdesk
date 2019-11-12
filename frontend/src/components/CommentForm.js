import React, { Fragment, Component } from "react";
import { Col, Input } from "reactstrap";
import moment from "moment";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    var textVal = e.target[0].value.trim();
    if (!textVal) {
      return;
    }
    this.props.onCommentSubmit({
      name: this.props.ticket.fullName,
      text: textVal,
      date: moment().format()
    });
    e.target[0].value = "";
    e.target[1].value = "";
    return;
  }
  render() {
    return (
      <Fragment>
        <form className="comment-form form-group" onSubmit={this.handleSubmit}>
          <div sm={12} row className="input-group">
            <Col sm={1}>
              <span className="input-group-addon">Comment</span>
            </Col>
            <Col sm={11}>
              <Input type="textarea" name="text" />
            </Col>
          </div>
          <div className="col-12 text-center cmt-btn">
            <input
              type="submit"
              className="center-block btn btn-primary"
              value="Comment"
            />
          </div>
        </form>
      </Fragment>
    );
  }
}
export default CommentForm;
