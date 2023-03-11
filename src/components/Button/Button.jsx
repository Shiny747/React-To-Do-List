import "./Button.css";

export function Button(props) {
  const getButtonClassName = (buttonType) => {
    const classNames = {
      add: "add",
      deleteAll: "delete-all type1",
      delete: "delete",
      checked: "checked",
      checker: 'checker'
    };
    return classNames[buttonType];
  };

  return <button onClick={props.onClick} className={`button ${getButtonClassName(props.buttonType)} `}>{props.children}</button>;
}