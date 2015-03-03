// Warning: Not in DOMContentLoaded

var CheckboxChoice = React.createClass({
  propTypes: {
    count: React.PropTypes.number.isRequired,
    store: React.PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {
      count: 4
    }
  },

  addQuestion: function(event) {
    console.log('Add question ' + event.target.value);
    this.props.store.push({value: event.target.value})
  },

  render: function() {
    if (this.props.store.length == 0) {
      return (
        <ul className="choices-list">
          { _(this.props.count).times(function(idx) {
            return (
              <li key={'cb-list' + idx}>
                <span>{(idx + 1)}</span> <input type="text" onBlur={this.addQuestion} placeholder={'Checkbox option #' + (idx + 1)} />
              </li>
            );
          }.bind(this)) }
        </ul>
      );
    } else {
      return (
        <ul className="choices-list">
          { _(this.props.store).map(function(model, idx) {
            return (
              <li key={'cb-list' + idx}>
                <input type="checkbox" name={'cb' + idx} /> <input type="text" value={model.value} placeholder={'Checkbox option #' + (idx + 1)} />
              </li>
            );
          }) }
        </ul>
      );
    }
  }
});

var RadioButtonChoice = React.createClass({
  propTypes: {
    count: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      count: 4
    };
  },

  render: function() {
    return (
      <ul className="choices-list">
        { _(this.props.count).times(function(idx) {
          return (
            <li key={'rb-list' + idx}>
              <span>{(idx + 1)}</span> <input type="text" placeholder={'Radio option #' + (idx + 1)} />
            </li>
          );
        }) }
      </ul>
    );
  }
});

var OpenQuestionChoice = React.createClass({
  propTypes: {
    count: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      count: 4
    };
  },

  render: function() {
    return (
      <ul className="choices-list">
        { _(this.props.count).times(function(idx) {
          return (
            <li key={'oq-list' + idx}>
              <span>{(idx + 1)}</span> <input type="text" name={'oq' + idx} placeholder={'Open ended question #' + (idx + 1)} size="70" />
            </li>
          );
        }) }
      </ul>
    );
  }
});

var SegmentedControl = React.createClass({
  getInitialState: function() {
    return {
      questionTypes: ['Free text', 'Checkbox', 'Radio button', 'Open ended'],
      numOfChoices: 4,
      currentSegment: 'Free text',
      checkboxQuestions: [],
      radioQuestions: [],
      openQuestions: []
    }
  },

  segmentValueChanged: function(label) {
    this.setState({
      currentSegment: label
    });
  },

  setNumOfChoices: function(event) {
    this.setState({
      numOfChoices: parseInt(event.target.value, 10)
    });
  },

  currentSegment: function() {
    if (this.state.currentSegment == 'Free text') {
      // alert('Put the Free text Component from here!!! Disable the select #.');
    } else if (this.state.currentSegment == 'Checkbox') {
      return <CheckboxChoice count={this.state.numOfChoices} store={this.state.checkboxQuestions} />;
    } else if (this.state.currentSegment == 'Radio button') {
      return <RadioButtonChoice count={this.state.numOfChoices} />;
    } else if (this.state.currentSegment == 'Open ended') {
      return <OpenQuestionChoice count={this.state.numOfChoices} />
    }
  },

  render: function() {
    return <div>
      <div className="btn-group">
        <input className="btn choice-count" type="number" min="1" name="numOfChoices" onChange={this.setNumOfChoices} value={this.state.numOfChoices} />

        { this.state.questionTypes.map(function(label, idx) {
          return (
            <button className={'btn' + (this.state.currentSegment == label ? ' current' : '')}
              type="button" key={'btn' + idx}
              onClick={this.segmentValueChanged.bind(this, label)}>{ label }
            </button>
          );
        }.bind(this)) }

      </div>
      <div className="choices">
        { /* The parent has to keep track of the Choice state */ }
        { this.currentSegment() }
      </div>
    </div>;
  }
});

var app = document.getElementById('app');
React.render(<SegmentedControl />, app)