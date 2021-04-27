using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BackendAPI.Migrations
{
    public partial class AdaptingToCommonApiTests : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Rentals",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Rentals",
                keyColumn: "ID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Rentals",
                keyColumn: "ID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Rentals",
                keyColumn: "ID",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Rentals",
                keyColumn: "ID",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 3);

            migrationBuilder.UpdateData(
                table: "BikeStations",
                keyColumn: "ID",
                keyValue: 4,
                column: "State",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Bikes",
                keyColumn: "ID",
                keyValue: 1,
                column: "BikeStationID",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Bikes",
                keyColumn: "ID",
                keyValue: 2,
                column: "BikeStationID",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Bikes",
                keyColumn: "ID",
                keyValue: 3,
                columns: new[] { "BikeStationID", "State" },
                values: new object[] { 2, 0 });

            migrationBuilder.UpdateData(
                table: "Bikes",
                keyColumn: "ID",
                keyValue: 4,
                column: "BikeStationID",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Bikes",
                keyColumn: "ID",
                keyValue: 5,
                column: "BikeStationID",
                value: 3);

            migrationBuilder.UpdateData(
                table: "Bikes",
                keyColumn: "ID",
                keyValue: 6,
                column: "BikeStationID",
                value: 3);

            migrationBuilder.UpdateData(
                table: "Bikes",
                keyColumn: "ID",
                keyValue: 7,
                column: "BikeStationID",
                value: 4);

            migrationBuilder.InsertData(
                table: "Bikes",
                columns: new[] { "ID", "BikeStationID", "State" },
                values: new object[] { 8, 4, 0 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "LastName", "Login", "Name", "PasswordHash", "Role" },
                values: new object[] { "NazwiskoAdmina", "admin", "ImieAdmina", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", "Admin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Bikes",
                keyColumn: "ID",
                keyValue: 8);

            migrationBuilder.UpdateData(
                table: "BikeStations",
                keyColumn: "ID",
                keyValue: 4,
                column: "State",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Bikes",
                keyColumn: "ID",
                keyValue: 1,
                column: "BikeStationID",
                value: 3);

            migrationBuilder.UpdateData(
                table: "Bikes",
                keyColumn: "ID",
                keyValue: 2,
                column: "BikeStationID",
                value: 3);

            migrationBuilder.UpdateData(
                table: "Bikes",
                keyColumn: "ID",
                keyValue: 3,
                columns: new[] { "BikeStationID", "State" },
                values: new object[] { 3, 1 });

            migrationBuilder.UpdateData(
                table: "Bikes",
                keyColumn: "ID",
                keyValue: 4,
                column: "BikeStationID",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Bikes",
                keyColumn: "ID",
                keyValue: 5,
                column: "BikeStationID",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Bikes",
                keyColumn: "ID",
                keyValue: 6,
                column: "BikeStationID",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Bikes",
                keyColumn: "ID",
                keyValue: 7,
                column: "BikeStationID",
                value: 1);

            migrationBuilder.InsertData(
                table: "Rentals",
                columns: new[] { "ID", "BikeID", "EndDate", "StartDate", "UserID" },
                values: new object[,]
                {
                    { 2, 1, new DateTime(2021, 2, 20, 3, 15, 15, 0, DateTimeKind.Unspecified), new DateTime(2021, 2, 20, 3, 0, 0, 0, DateTimeKind.Unspecified), 1 },
                    { 1, 1, new DateTime(2021, 2, 20, 2, 10, 15, 0, DateTimeKind.Unspecified), new DateTime(2021, 2, 20, 2, 0, 0, 0, DateTimeKind.Unspecified), 1 }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "LastName", "Login", "Name", "PasswordHash", "Role" },
                values: new object[] { "NazwiskoTestowe", "login1", "ImieTestowe", "e6c3da5b206634d7f3f3586d747ffdb36b5c675757b380c6a5fe5c570c714349", "User" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "ID", "Blocked", "LastName", "Login", "Name", "PasswordHash", "Role" },
                values: new object[,]
                {
                    { 8, false, "NazwiskoAdmina", "admin", "ImieAdmina", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", "Admin" },
                    { 2, false, "Nazwisko2", "login2", "Imie2", "1ba3d16e9881959f8c9a9762854f72c6e6321cdd44358a10a4e939033117eab9", "User" },
                    { 3, false, "Brzęczeszykiewicz", "login3", "Grzegorz", "3acb59306ef6e660cf832d1d34c4fba3d88d616f0bb5c2a9e0f82d18ef6fc167", "User" },
                    { 4, true, "Nazwisko3", "login4", "Imie3", "a417b5dc3d06d15d91c6687e27fc1705ebc56b3b2d813abe03066e5643fe4e74", "User" },
                    { 5, false, "PostmanUserLastName", "PostmanUser", "PostmanUserName", "b1acfbe7c73da3f39089a6d184981e65d746f6f3c66a271c371921e3ee0872ba", "User" },
                    { 6, false, "PostmanAdminLastName", "PostmanAdmin", "PostmanAdminName", "acd1b21d80c9c5cc1d13dfd449a37283a0b5451eb87134fc1d26af237a2a1a5a", "Admin" },
                    { 7, false, "PostmanTechLastName", "PostmanTech", "PostmanTechName", "8dd6a6084b509a081aed96e004d4a7dcb378a97a6bfcb39bd197be368fa4569a", "Tech" },
                    { 9, false, "NazwiskoTecha", "tech", "ImieTecha", "fe9bbd400bb6cb314531e3462507661401959afc69aae96bc6aec2c213b83bc1", "Tech" }
                });

            migrationBuilder.InsertData(
                table: "Rentals",
                columns: new[] { "ID", "BikeID", "EndDate", "StartDate", "UserID" },
                values: new object[] { 3, 2, new DateTime(2021, 3, 15, 12, 28, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified), 2 });

            migrationBuilder.InsertData(
                table: "Rentals",
                columns: new[] { "ID", "BikeID", "EndDate", "StartDate", "UserID" },
                values: new object[] { 4, 3, new DateTime(2021, 3, 18, 21, 39, 18, 0, DateTimeKind.Unspecified), new DateTime(2021, 3, 18, 21, 20, 12, 0, DateTimeKind.Unspecified), 3 });

            migrationBuilder.InsertData(
                table: "Rentals",
                columns: new[] { "ID", "BikeID", "EndDate", "StartDate", "UserID" },
                values: new object[] { 5, 2, new DateTime(2021, 3, 20, 13, 0, 56, 0, DateTimeKind.Unspecified), new DateTime(2021, 3, 20, 12, 40, 34, 0, DateTimeKind.Unspecified), 3 });
        }
    }
}
