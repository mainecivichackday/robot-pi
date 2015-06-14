/* Tabs provides a simple way of providing tabbed components. Tab names
*	are taken from the children abs. By default, is looks for a property
*	named 'tabName'. This can setting the property 'propName'.
*
*	By default, tab names must be unique and keys do not need to 
* 		be provided to children elements. 
*
*	If multiple tabs with the same tabname are required, set the
*		property 'useKeys' to true. Keys must be provided to children
*		even if they are not generated via a map function or similar.
*
*	Support for multiple tabs being opened is enabled via the property
*		allowMultiple. Set to true, multiple children can be set to 
*		active. 
*
*	Props:
*		allowMultiple: bool - If true, multiple tabs can be selected. 
*		useKeys: bool - If true, Tabs requires children to have keys, but does
*			not require tabs to have unique names.
*		propName: string, default: 'tabName' - The propname that will be used
*			to get the title of the tab. This must be unique among all children
*			unless useKeys is enabled.
*		onChange: A callback, or list of callbacks, to call when changing the
*			active tab. TODO: Allow callback to return false to prevent change
*		active: The current active tab(s) by title or key (if useKeys=true)	
*
*		TODO: stateless: boolean to disable statefulness. It will be up to the
*			to change the active property. callback will be called if a change
*			was requested by the user.
*	Example:
*		<ReactTabs>
*			<Elem tabName='Action for Tab1!' />
*			<SomeOtherElem tabName='Tile for Tab#2' />
*			<div tabName='Tab Number 3!'>Interesting lack of content.</div>
*		</ReactTabs>
*/
var ReactTabs = React.createClass({
	getDefaultProps: function(){
		return {
			active:null, 
			allowMultiple: false, 
			propName: 'tabName',
			onChange: null,
			useKeys: false,
			useState: false,
		};
	},

	/* The initial state is copied over from the specified props.
	   If allowMultiple=true, active becomes an array. 
	*/ 
	getInitialState: function(){
		var p = this.props;
		var active = p.active;
			//Set active to an array if allowMultiple is true.
			if(p.allowMultiple){
				if(active===null)
					active = [];
				else if(!Array.isArray(active))
					active = [active];
			}
			return {active: active};
	},

	//When receiving new props, if tabs is not managing own state, update state.
	componentWillReceiveProps: function(newProps){
		if(this.props.useState)
			return;	//Let state manage things, not props.
		
		var active = newProps.active;
		if(newProps.allowMultiple){
			if(active===null)
				active=[];
			else if(!Array.isArray(active))
				active = [active];
		}
		this.setState({active: active});
	},

	/* render() iterates through all the children, reading their tabname, 
	   and saving active children to an array for display. 
	 */
	render: function(){
	    var self = this;	
		var children = this.props.children;
		var activeChildren = [];

		return( 
			<div> 				
				{/*Show the tabs*/}
				<ul className='tabs'>
					{React.Children.map(children, function(child){
						if(child === null) return;

						var name = self._getName(child);
						var key = self._getKey(child);
						var active = self._isActive(child);
						if(active)
							activeChildren.push(child);

						return (
							<li className={active ? 'active' : ''}
								onClick={self._onClick.bind(null,key)}>
								{name}
							</li>
						);
					})}
				</ul>

				{/*Show content for active tabs */}
				<div className='tabcontent'>
					{activeChildren}
				</div>
			</div>
		);
	},

	//Returns the name of the specified child as defined by propName.
	_getName: function(child){
		return child.props[this.props.propName];
	},

	//Returns the key of the child (either the tabName, or the child
	//key if useKeys is turned on. 
	_getKey: function(child){
		if(this.props.useKeys)
			return child.key;
		else
			return this._getName(child);
	},

	//Returns true if this tab is listed as active in state.active.
	_isActive: function(child){
		var key = this._getKey(child);
		if(this.props.allowMultiple){
			return this.state.active.indexOf(key) >= 0;
		}

		return this.state.active === key;	
	},

	//Calls the specified callbacks with the requested new state.
	_notifyCallbacks: function(newState){
		var callbacks = this.props.onChange;

		if(callbacks !== null){
			if(Array.isArray(callbacks))
				callbacks.map(function(cb){
					cb(newState);
				});	
			else
				callbacks(newState);
		}
	},

	//Triggered when clicking a new tab. Sets the clicked tab as
	//active in the state, and then notifies the callbacks.
	//TODO: Reverse order - notify callbacks, allow them to prevent state change.
	_onClick: function(key){
		var p = this.props;
		var active = this.state.active;
		var retval;
		if(p.allowMultiple){
			var index = active.indexOf(key);
			var newVal = active.slice();
			if(index >= 0)
				newVal.splice(index, 1);
			else
				newVal.push(key);
			
			retval = {active: newVal};
			if(p.useState)
				this.setState(retval);
			this._notifyCallbacks(retval);
		}

		else if(active !== key){
			retval = {active: key};
			if(p.useState)
				this.setState(retval);
			this._notifyCallbacks(retval);
		}
	}
});