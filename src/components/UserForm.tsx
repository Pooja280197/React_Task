import React, { useEffect, useState } from 'react'
import type { User } from '../types/user';
import { FormConfig } from '../config/FormConfig';

interface Props {
    initialData?: User | null;
    onSubmit: (data: User) => void;
    onCancel?: () => void;
}

const blankFields: User = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
}

const UserForm = ({ initialData, onSubmit, onCancel }: Props) => {
    const [formData, setFormData] = useState<User>(blankFields);
    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);


    const validate = () => {
        const newErrors: Record<string, string> = {};

        FormConfig.forEach((field) => {
            const value = formData[field.name as keyof User];

            // Required validation
            if (field.required && !value) {
                newErrors[field.name] = `${field.label} is required`;
                return;
            }

            // Phone number validation (exactly 10 digits)
            if (field.name === "phone" && value) {
                const phoneRegex = /^[0-9]{10}$/;

                if (!phoneRegex.test(String(value))) {
                    newErrors[field.name] = "Phone number must be exactly 10 digits";
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        onSubmit(formData);
        setFormData(blankFields);
        setErrors({});
    };

    return (
        <div className='form'>
            <form onSubmit={handleSubmit} className='userForm'>
                <h3>{initialData ? "Edit User" : "Add User"}</h3>
                {
                    FormConfig.map((field) => (
                        <div key={field.fieldNumber} >
                            <div className='field'>
                                <label>
                                    {field.label}
                                    {field.required && <span className='required'>*</span>}
                                </label>

                                <input
                                    type={field.type}
                                    value={formData[field.name as keyof User] || ""}
                                    placeholder={field.placeholder}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                />
                            </div>

                            {errors[field.name] && (
                                <p className="error">{errors[field.name]}</p>
                            )}

                        </div>
                    ))
                }

                <div>
                    <button className='submitButton'>
                        {initialData ? "Update User" : "Create User"}
                    </button>

                    {
                        onCancel && (
                            <button className='cancelButton'>
                                Cancel
                            </button>
                        )
                    }
                </div>
            </form>

        </div>
    )
}

export default UserForm;
