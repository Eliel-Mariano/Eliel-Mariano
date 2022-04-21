import { useState } from "react";

export const useForm = (initialState) => {

  const [form, setForm] = useState(initialState); //adaptando na importação(const { form, onChange, cleanFields } = useForm({ name:...)

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
  const cleanFields = () => {
    setForm(initialState);
  };

return { form, onChange, cleanFields };
};