To Install Locally
==============

	- Clone git repository into a directory.
	- Do a `bundle install`.
	- Do `ruby ruined.rb`.
	- The project should come alive at http://localhost:4567.


Defining Our Terms
==============

Average Quality
--------------

The average quality of the thing, as voted on by us.
	
	- Range: 0 to 10

Average Fan Awfulness
--------------

The average crumminess of the thing's fans, as voted on by us.

	- Range: 0 to 10

Final Quality
--------------

The **Average Quality** minus the **Average Fan Awfulness**.
If the fans are worse than the thing is good, it's possible for this to end up negative.
Simply put:  This is the percieved quality of the thing, assuming the fans' opinions are weighted equally with the quality of the thing itself.

	- Range: 10 to -10

Degree Of Ruin
--------------

Finding out what percentage of the **Average Quality** the **Final Quality** is and subtracting it from a hundred.
Simply put:  The percentage of the thing's innate quality that the awful fans knock off.

	- Range: 0 to 1100

Level Of Tragedy
--------------

The result of the following equation:

	(averageQuality*5) + (degreeOfRuin/22)

This weights the **Average Quality** and **Degree Of Ruin** to a maximum 50 points apiece, for a potential total of 100.
The higher the original quality, and the higher the degree to which the thing is ruined by its fans, the bigger a tragedy it is.
If there was something we considered uncool with fans so cool that they make us look at it more favorably, this would end up negative.
Simply put:  The numerical amount from which a thing's fans detract from our perception of it.

	- Range (for our sake, for now): 0 to 100