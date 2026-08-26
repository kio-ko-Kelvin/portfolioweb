from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ContactMessageForm

from .models import (
    Profile,
    Project,
    Service,
)


def home(request):
    """
    Portfolio homepage.
    """

    if request.method == "POST":
        form = ContactMessageForm(request.POST)

        if form.is_valid():
            form.save()

            messages.success(
                request,
                "Your message has been sent successfully!"
            )
            return redirect('portfolioapp:home')

        else:
            messages.error(
                request,
                "There was a problem sending your message. Please check the form."
            )

    else:
        form = ContactMessageForm()


    profile = Profile.objects.first()
    
    featured_projects = Project.objects.all()

    services = Service.objects.all()

    context = {
        "profile": profile,
        "projects": featured_projects,
        "services": services,
        "form": form,
    }

    return render(
        request,
        "portfolioapp/index.html",
        context,
    )