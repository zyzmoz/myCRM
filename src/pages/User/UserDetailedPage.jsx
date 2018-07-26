import React, { Component } from 'react';
import { Panel, Grid, Row, Col, Checkbox, Button, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getUser } from '../../actions/user';


const mapState = (state) => ({
  user: state.user.object
});

const actions = {
  getUser
}

class UserDetailedPage extends Component {
  async componentDidMount() {
    const { id } = this.props.match.params;
    const { getUser } = this.props;
    await getUser(id);
  }

  render() {
    const { user } = this.props;
    return (
      <div className="padding window">
        
        {user &&
          <Panel bsStyle="info">
            <Panel.Heading>
              <Panel.Title componentClass="h3"><strong>Usuário: </strong>{user.user}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Grid className="grid">
                <Row className="show-grid">
                  <Col xs={10} md={8}>
                    <strong>Nome: </strong>{user.name}
                  </Col>
                  <Col xs={6} md={4}>
                    <Checkbox checked={user.manager === 'S'} readOnly>
                      Administrador
                    </Checkbox>
                  </Col>
                </Row>
                <Row className="show-grid">
                  <Col xs={6} md={4}>
                    <strong>Telefone: </strong>{user.phone}
                  </Col>
                  <Col xs={6} md={4}>
                    <strong>Celular: </strong>{user.mobile}
                  </Col>
                  <Col xs={6} md={4}>
                    <strong>Email: </strong>{user.email}
                  </Col>                  
                </Row>
              </Grid>
              <hr />

              <Button onClick={() => this.props.history.goBack()}>
                <Glyphicon glyph="arrow-left" />
                Voltar
              </Button>
            </Panel.Body>
          </Panel>
        }

      </div>
    );
  }
}

export default connect(mapState, actions)(UserDetailedPage);