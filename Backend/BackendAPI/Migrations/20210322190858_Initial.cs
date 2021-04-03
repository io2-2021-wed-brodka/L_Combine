using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BackendAPI.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BikeStations",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    State = table.Column<int>(nullable: false),
                    LocationName = table.Column<string>(maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BikeStations", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Bikes",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BikeStationID = table.Column<int>(nullable: true),
                    State = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bikes", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Bikes_BikeStations_BikeStationID",
                        column: x => x.BikeStationID,
                        principalTable: "BikeStations",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Rentals",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: true),
                    BikeID = table.Column<int>(nullable: false),
                    UserID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rentals", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Rentals_Bikes_BikeID",
                        column: x => x.BikeID,
                        principalTable: "Bikes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rentals_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "BikeStations",
                columns: new[] { "ID", "LocationName", "State" },
                values: new object[,]
                {
                    { 1, "Warszawa Targowa", 0 },
                    { 2, "Warszawa Aleje Jerozolimskie", 0 },
                    { 3, "Warszawa PKiN", 0 },
                    { 4, "Warszawa Politechnika", 1 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "ID", "LastName", "Name" },
                values: new object[,]
                {
                    { 1, "NazwiskoTestowe", "ImieTestowe" },
                    { 2, "Nazwisko2", "Imie2" },
                    { 3, "Brzęczeszykiewicz", "Grzegorz" },
                    { 4, "Nazwisko3", "Imie3" }
                });

            migrationBuilder.InsertData(
                table: "Bikes",
                columns: new[] { "ID", "BikeStationID", "State" },
                values: new object[,]
                {
                    { 4, 1, 0 },
                    { 5, 1, 0 },
                    { 7, 1, 0 },
                    { 1, 3, 0 },
                    { 2, 3, 0 },
                    { 3, 3, 1 },
                    { 6, 4, 0 }
                });

            migrationBuilder.InsertData(
                table: "Rentals",
                columns: new[] { "ID", "BikeID", "EndDate", "StartDate", "UserID" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2021, 2, 20, 2, 10, 15, 0, DateTimeKind.Unspecified), new DateTime(2021, 2, 20, 2, 0, 0, 0, DateTimeKind.Unspecified), 1 },
                    { 2, 1, new DateTime(2021, 2, 20, 3, 15, 15, 0, DateTimeKind.Unspecified), new DateTime(2021, 2, 20, 3, 0, 0, 0, DateTimeKind.Unspecified), 1 },
                    { 3, 2, new DateTime(2021, 3, 15, 12, 28, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 5, 2, new DateTime(2021, 3, 20, 13, 0, 56, 0, DateTimeKind.Unspecified), new DateTime(2021, 3, 20, 12, 40, 34, 0, DateTimeKind.Unspecified), 3 },
                    { 4, 3, new DateTime(2021, 3, 18, 21, 39, 18, 0, DateTimeKind.Unspecified), new DateTime(2021, 3, 18, 21, 20, 12, 0, DateTimeKind.Unspecified), 3 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bikes_BikeStationID",
                table: "Bikes",
                column: "BikeStationID");

            migrationBuilder.CreateIndex(
                name: "IX_Rentals_BikeID",
                table: "Rentals",
                column: "BikeID");

            migrationBuilder.CreateIndex(
                name: "IX_Rentals_UserID",
                table: "Rentals",
                column: "UserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rentals");

            migrationBuilder.DropTable(
                name: "Bikes");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "BikeStations");
        }
    }
}
