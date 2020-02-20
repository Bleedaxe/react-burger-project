import * as React from "react";

import axios from "../../../axios-orders";

import styles from "./ContactData.module.css";

import BurgerIngredients from "../../../common/contracts/BurgerIngredients";
import Button from "../../../components/UI/Button/Button";
import { AxiosResponse } from "axios";
import Spinner from "../../../components/UI/Spinner/Spinner";

import Input from "../../../components/UI/Input/Input";

interface ContactDataProps {
  ingredients: BurgerIngredients;
  price: number;
  afterOrderHandler: () => void;
}

interface ElementValidation {
  validation: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
  };
  valid: boolean;
  touched: boolean;
}
interface Element {
  label: string;
  elementType: keyof typeof Input;
  value: string;
}
interface InputElement extends Element, ElementValidation {
  elementConfig: {
    type?: string;
    placeholder?: string;
  };
}
interface SelectElement extends Element {
  elementConfig: {
    options?: Array<{
      value: string;
      displayValue: string;
    }>;
  };
}

interface OrderForm {
  name: InputElement;
  email: InputElement;
  street: InputElement;
  postalCode: InputElement;
  country: InputElement;
  deliveryMethod: SelectElement;
}

interface ContactDataState {
  orderForm: OrderForm;
  loading: boolean;
}

class ContactData extends React.Component<ContactDataProps, ContactDataState> {
  constructor(props: ContactDataProps) {
    super(props);

    this.state = {
      orderForm: {
        name: {
          label: "Name",
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your name"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        email: {
          label: "Mail",
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Your Mail"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        street: {
          label: "Street",
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your street"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        postalCode: {
          label: "Postal code",
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your postal code"
          },
          value: "",
          validation: {
            required: true,
            maxLength: 4,
            minLength: 4
          },
          valid: false,
          touched: false
        },
        country: {
          label: "Country",
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "country"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        deliveryMethod: {
          label: "Delivery method",
          elementType: "select",
          elementConfig: {
            options: [
              { value: "cheapest", displayValue: "Cheapest" },
              { value: "fastest", displayValue: "Fastest" }
            ]
          },
          value: "cheapest"
        }
      },
      loading: false
    };
  }

  onChangeHandler(changeState: (state: ContactDataState) => void) {
    const state = { ...this.state };
    changeState(state);
    this.setState(state);
  }

  isValidForm(orderForm: OrderForm) {
    return (Object.keys(orderForm) as Array<keyof OrderForm>)
      .map(key => this.state.orderForm[key])
      .map(element =>
        this.isValidationElement(element) ? element.valid : true
      )
      .reduce((prev, curr) => prev && curr);
  }

  formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!this.isValidForm(this.state.orderForm)) {
      console.log("form is invalid!");
      return;
    }
    this.setState({ loading: true });
    const customer = {
      name: this.state.orderForm.name.value,
      email: this.state.orderForm.email.value,
      address: {
        street: this.state.orderForm.street.value,
        country: this.state.orderForm.country.value,
        postalCode: this.state.orderForm.postalCode.value
      }
    };
    axios
      .post("/orders.json", {
        customer,
        deliveryMethod: "fastest",
        ingredients: this.props.ingredients,
        price: this.props.price
      })
      .then((res: AxiosResponse) => {
        console.log(res);
        this.setState({ loading: false }, this.props.afterOrderHandler);
      });
  }

  isValidationElement = function(element: any): element is ElementValidation {
    return element && element.valid !== undefined && element.validation;
  };

  inputChangedHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    formElementId: keyof OrderForm
  ) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[formElementId] };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[formElementId] = updatedFormElement as SelectElement &
      InputElement;
    if (this.isValidationElement(updatedFormElement)) {
      updatedFormElement.valid = this.checkValidity(
        updatedFormElement.value,
        updatedFormElement
      );
      updatedFormElement.touched = true;
    }
    this.setState({ orderForm: updatedOrderForm });
  };

  toInputElement = (
    element: InputElement | SelectElement,
    key: keyof OrderForm
  ) => {
    const Type = Input[element.elementType];
    return (
      <Type
        key={key}
        label={element.label}
        {...element.elementConfig}
        value={element.value}
        valid={this.isValidationElement(element) ? element.valid : true}
        touched={this.isValidationElement(element) ? element.touched : true}
        onChange={(
          event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLSelectElement>
        ) => this.inputChangedHandler(event, key)}
      />
    );
  };

  checkValidity(value: string, rules: ElementValidation) {
    let isValid = true;

    if (rules.validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.validation.maxLength) {
      isValid = value.length <= rules.validation.maxLength && isValid;
    }

    if (rules.validation.minLength) {
      isValid = value.length >= rules.validation.minLength && isValid;
    }

    return isValid;
  }

  render() {
    const orderForm = this.state.orderForm;
    const formElements = (Object.keys(orderForm) as Array<
      keyof typeof orderForm
    >).map(key => this.toInputElement(orderForm[key], key));
    let form = (
      <form onSubmit={this.formSubmitHandler}>
        {formElements}
        <Button
            btnType="Success"
            disabled={this.isValidForm(this.state.orderForm) === false}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
