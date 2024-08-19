import { useState } from "react";

/**
 * @author: Jangmyun
 * @argument: initial obj state
 * @return: [state, stateChangeFunction]
 * @description: input이 여러 개일 때 input의 id값을 기준으로 input value 값을 state에 저장하고 해당 change 함수를 리턴하는 함수
 */
export default function useFormInput(initialState) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  return [formData, handleChange, resetForm];
}
