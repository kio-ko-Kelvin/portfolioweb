from django import forms
from .models import ContactMessage

class ContactMessageForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ["fullname", "emailaddress", "mobilenumber", "emailsubject", "message"]

        widgets = {
            "fullname": forms.TextInput(attrs={
                "placeholder": "Full name",
                "class": "input-box",
            }),

            "amailaddress": forms.EmailInput(attrs={
                "placeholder" : "Email Address",
                "class" : "input-box",
            }),

            "mobilenumber" : forms.NumberInput(attrs={
                "Placeholder" : "Mobile number",
                "class" : "input-box",
            }),

            "emailsubject" : forms.TextInput(attrs={
                "Placeholder" : "Email Subject",
                "class" : "input-box",
            }),

            "message" : forms.Textarea(attrs={
                "Placeholder" : "Your Message",
                "class" : "input-box",
                "rows" : 6,
            }),
        }