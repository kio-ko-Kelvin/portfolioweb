from django.shortcuts import render, get_object_or_404

from .models import (
    Profile,
    Project,
    Service,
)


def home(request):
    """
    Portfolio homepage.
    """

    profile = Profile.objects.first()
    
    featured_projects = Project.objects.all()

    services = Service.objects.all()

    context = {
        "profile": profile,
        "projects": featured_projects,
        "services": services,
    }

    return render(
        request,
        "portfolioapp/index.html",
        context,
    )