using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using UserData.Repository.DataContext;
using UserData.Repository.DTO;
using UserData.Repository.Interface;
using UserData.Repository.Repository;
using UserData.Services.Interface;
using UserData.Services.Repositories;
using UserData.Services.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
var smtpSettings = builder.Configuration.GetSection("SmtpSettings").Get<SmtpSettings>();
builder.Services.AddSingleton(smtpSettings);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IGenderService,GenderService>();
builder.Services.AddScoped<IGenderRepository,GenderRepository>();
builder.Services.AddScoped<IUserService, UserServices>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICountryService , CountryService>();
builder.Services.AddScoped<ICountryRepository,CountryRepository>();
builder.Services.AddScoped<IJWTService, JWTServices>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddDbContext<ApplicationDbContext>();


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:key"]))
            };
            options.Events = new JwtBearerEvents
            {
                OnChallenge = context =>
                {
                    // Modify the response to return a 401 status code
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                }
            };

        });
           

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder
               .AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
        });
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors("AllowAll");


app.MapControllers();

app.Run();
