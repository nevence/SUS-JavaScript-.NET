﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SkladisteAPI.Data;

#nullable disable

namespace SkladisteAPI.Migrations
{
    [DbContext(typeof(SkladisteDbContext))]
    partial class SkladisteDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("SkladisteAPI.Model.Entities.Proizvod", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<float?>("Cena")
                        .HasColumnType("real");

                    b.Property<string>("Kategorija")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Proizvodi", (string)null);
                });

            modelBuilder.Entity("SkladisteAPI.Model.Entities.Skladiste", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Adresa")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Kapacitet")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Popunjeno")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("Skladista", (string)null);
                });

            modelBuilder.Entity("SkladisteAPI.Model.Entities.SkladisteProizvod", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int?>("Kolicina")
                        .HasColumnType("int");

                    b.Property<int?>("ProizvodID")
                        .HasColumnType("int");

                    b.Property<int?>("SkladisteID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("ProizvodID");

                    b.HasIndex("SkladisteID");

                    b.ToTable("SkladisteProizvodi", (string)null);
                });

            modelBuilder.Entity("SkladisteAPI.Model.Entities.SkladisteProizvod", b =>
                {
                    b.HasOne("SkladisteAPI.Model.Entities.Proizvod", "Proizvod")
                        .WithMany("SkladisteProizvodi")
                        .HasForeignKey("ProizvodID");

                    b.HasOne("SkladisteAPI.Model.Entities.Skladiste", "Skladiste")
                        .WithMany("SkladisteProizvodi")
                        .HasForeignKey("SkladisteID");

                    b.Navigation("Proizvod");

                    b.Navigation("Skladiste");
                });

            modelBuilder.Entity("SkladisteAPI.Model.Entities.Proizvod", b =>
                {
                    b.Navigation("SkladisteProizvodi");
                });

            modelBuilder.Entity("SkladisteAPI.Model.Entities.Skladiste", b =>
                {
                    b.Navigation("SkladisteProizvodi");
                });
#pragma warning restore 612, 618
        }
    }
}
